var baseConfig = {
  folderImage: "assets/images/",
  selectIntervalTime: 5000
}

function generateItemObject(index, name, number, image, style) {
  id = name ? 'id="' + name + '"' : '';
  image = image ? '<img src="' + image + '">' : '';
  style = style ? 'style="' + style + '"' : '';
  var base = '<div name="itemsCard" ' + id + ' class="card card-item float-left" ' + style + ' >' + image + '</div>';
  return base;
}

function generateItemCardObject(index, name, number, image, style) {
  id = name ? 'id="' + name + '"' : '';
  image = image ? '<img src="' + image + '">' : '';
  style = style ? 'style="' + style + '"' : '';
  var base = '<div name="itemsRandomCard" ' + id + ' class="item" ' + style + '><figure class="figure">' + image + '</figure></div>';
  return base;
}

$(function () {
  $('#folderImage').val(baseConfig.folderImage);
  $('#timeRandomResult').val(baseConfig.selectIntervalTime);
  $('[id="go"]').slideUp('100');
  var itemsArrayJson = $('#itemsArrayJson').val(
    JSON.stringify([{
        name: "Jose Muñoz",
        number: "",
        image: "jose.muñoz.jpg",
        style: ""
      },
      {
        name: "Jhonatan Montoya",
        number: "",
        image: "jhonatan.montoya.jpg",
        style: ""
      },
      {
        name: "jose rey",
        number: "",
        image: "jose.rey.jpg",
        style: ""
      },
      {
        name: "jaime quispe",
        number: "",
        image: "jaime.quispe.jpg",
        style: ""
      },
      {
        name: "Binni Cordova",
        number: "",
        image: "binni.cordova.jpg",
        style: ""
      },
      {
        name: "Bruno Galvan",
        number: "",
        image: "bruno.galvan  .jpg",
        style: ""
      }
    ])
  );
});


function start() {
  // caricando parametri
  var folderImage = $('#folderImage').val();
  var timeRandomResult = $('#timeRandomResult').val();
  var itemsArrayJson = $('#itemsArrayJson').val();
  itemsArrayJson = JSON5.parse(itemsArrayJson);
  if (folderImage) {
    baseConfig.folderImage = folderImage;
  }
  if (timeRandomResult) {
    baseConfig.timeRandomResult = timeRandomResult;
  }
  if (itemsArrayJson) {
    items = itemsArrayJson;
  }


  $('[id="start"]').slideUp();
  $('[id="config"]').slideUp();
  setTimeout(function () {
    $('[id="go"]').slideDown('400');
    $('div[id="list-items"]').removeClass('display-hidden');
  }, 2000);


  var listItems = "";
  var listCardItems = "";
  $.each(items, function (index, el) {
    console.log(items[index]);
    listItems += generateItemObject(index, items[index].name, items[index].number, baseConfig.folderImage + items[index].image, items[index].style);
    listCardItems += generateItemCardObject(index, items[index].name, items[index].number, baseConfig.folderImage + items[index].image, items[index].style);
  });

  $('div[class*="logo"]').addClass('top-100');
  $('div[id="list-items"]').html(listItems).addClass('to-hidden');
  $('div[id="list-card-items"]').html(listCardItems).addClass('to-hidden');
  $('div[id="list-card-items"]').find('div[class*="item"]').addClass('to-hidden');

  setTimeout(function () {
    $('div[id="list-items"]').addClass('to-show');
    $('div[id="list-card-items"]').addClass('to-show');
  }, 2000);
}

var selectedIndex,
  selectedItem;

function go() {
  $('div[id="list-items"]').removeClass('display-hidden');
  $('button[class^="btn"]').prop('disabled', true);
  $('div[class*="selected"]').addClass('scarted').removeClass('selected');
  if (selectedIndex) {
    items.splice(selectedIndex, 1);
  }

  setTimeout(function () {
    $('div[class*="scarted"]').remove();

    var itemsRandomCard = $('div[name="itemsRandomCard"]');
    if (itemsRandomCard.length == 1) {
      itemsRandomCard.each(function (index, el) {
        $(this).addClass('champion');
        $(this).removeClass('to-hidden');
      });
      $('div[class*="logo"]').removeClass('top-100').css('opacity', '.2');
      $('div[id="list-items"]').addClass('display-hidden');


      $('[id="go"]').slideUp('400');
      setTimeout(function () {
        $('[id="start"]').slideDown('100');
        $('[id="config"]').slideDown('100');
        $('button[class^="btn"]').prop('disabled', false);
      }, 5000);
    } else {
      itemsRandomCard.each(function (index, el) {
        $(this).addClass('animate');
        $(this).css('animation-duration', (index < 5 ? (index <= 0 ? 0.8 : index) * 3.1416 : index / 2 * 3.1416) + 's');
        // $(this).addClass('to-hidden');
      });
      console.log("** START* CERCANDO NUMERO RANDOM **")
      selectedIndex = Math.floor(Math.random() * items.length);
      console.log("selectedIndex: " + selectedIndex);
      selectedItem = items[selectedIndex];
      console.log("selectedItem:" + selectedItem);

      setTimeout(function () {
        $('div[class*="animate"]').removeClass('animate');
        console.log("--> START* on add-class selected :  cercando elemento : ");
        console.log(items[selectedIndex].name);
        console.log("--> END* on add-class selected :  cercando elemento : ");
        $('div[id="list-card-items"]').find('div[class*="item"]').addClass('to-hidden');
        $('div[id="' + items[selectedIndex].name + '"]').addClass('to-show');
        $('div[id="' + items[selectedIndex].name + '"]').addClass('selected');
        $('button[class^="btn"]').prop('disabled', false);
      }, baseConfig.selectIntervalTime);
    }
  }, 1000);
}