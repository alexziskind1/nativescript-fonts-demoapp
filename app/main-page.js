var vmModule = require("./main-view-model");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    
    //getFonts();
}

function getFonts() {
    var familyCount = 0;
    var fontCount = 0;
    var poiretCount = 0;
    
    var familyNames = UIFont.familyNames();
    for (var i = 0; i < familyNames.count; ++i) {
        var famName = familyNames[i];
        var fontNamesForFamily = UIFont.fontNamesForFamilyName(famName);
        for (var k = 0; k < fontNamesForFamily.count; ++k) {
            var fontName = fontNamesForFamily[k];
            if (fontName.indexOf("Poiret") > -1)
                poiretCount++;
            fontCount++;
        }
    }
    familyCount = i;
    alert('family count: ' + familyCount + ", font count: " + fontCount + ", poiret count: " + poiretCount);
}

function labelLoaded(args) {
    //Get font from deployed file
    var fontPath = NSBundle.mainBundle().pathForResourceOfType("app/res/PoiretOne-Regular", "ttf");
    var fontUrl = NSURL.fileURLWithPath(fontPath);
    var fontData = NSData.dataWithContentsOfURL(fontUrl);
    var provider = CGDataProviderCreateWithCFData(fontData);
    var font = CGFontCreateWithDataProvider(provider);
    var error = NSError.alloc().init();
    CTFontManagerRegisterGraphicsFont(font, error);
    args.object.ios.font = UIFont.fontWithNameSize("PoiretOne-Regular", 30);
}


function buttonLoaded(args) {
    //Set a system font
    args.object.ios.font = UIFont.fontWithNameSize("HelveticaNeue-UltraLight", 80);
}

exports.pageLoaded = pageLoaded;
exports.labelLoaded = labelLoaded;
exports.buttonLoaded = buttonLoaded;
