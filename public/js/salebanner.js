  function runSalesBanner(slSettings){
    let salesBannerHTML = `
      <div style="width: 100%; display: flex; justify-content: center">
        <div style="max-width: 1200px; width: 100%; display: flex; 
        padding: 40px 20px; background: rgba(${slSettings.bgColor.red}, 
        ${slSettings.bgColor.green}, ${slSettings.bgColor.blue})">
          <div style="width: 200px; display: flex; justify-content: center; 
          align-items: center; flex-direction: row; flex-grow: 1;">
            <img style="width: 200px;" src="${slSettings.productInfo.image_url}" />
            <div style="width: 100%; display: flex;justify-content: center; align-items: center; flex-direction: column;">
              <h2 style="font-size: 3rem; margin-bottom: 2.5rem; font-weight: 700; color: rgba(${slSettings.textColor.red}, ${slSettings.textColor.green}, ${slSettings.textColor.blue})">${slSettings.title}</h2>
              <span style="font-size: 6rem; color: rgba(${slSettings.textColor.red}, ${slSettings.textColor.green}, ${slSettings.textColor.blue})">${slSettings.percentage}% OFF</span>
            </div>
        </div>
    </div>
</div>`;
  
  if (slSettings.bannerLocation == "top") {
    $("header").after(salesBannerHTML);
  } else if (slSettings.bannerLocation == "bottom") {
    $("footer").before(salesBannerHTML);
  } else {
    $(".sale-banner-app").prepend(salesBannerHTML);
  }
  
}
  
$.get( "https://cpshopifyapp1.herokuapp.com/api/banners", function(data) {
    console.log( "success" );
    // console.log(data)
  })
    .done(function(data) {
        console.log(data.data[0].bgColor)
        runSalesBanner(data.data[0])
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "finished" );
    });

