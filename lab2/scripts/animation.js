/*
  TODO
 Implementieren Sie die folgenden Funktionen um die SVG-Grafiken der Geräte anzuzeigen und verändern.

 Hinweise zur Implementierung:
 - Verwenden Sie das SVG-Plugin für jQuery, welches bereits für Sie eingebunden ist (Referenz: http://keith-wood.name/svg.html)
 - Sie dürfen das Bild bei jedem Funktionenaufruf neu laden und Ihre Veränderungen vornehmen;
 Tipp: Durch Überschreiben der OnLoad Funktion von svg.load() können Sie die Grafik noch bevor diese zum ersten Mal angezeigt wird verändern
 - In allen bereit gestellten SVG-Grafiken sind alle für Sie relevanten Stellen mit Labels markiert.
 - Da Ihre Grafiken nur beim Laden der Übersichtsseite neu gezeichnet werden müssen, bietet es ich an die draw_image Funktionen nach dem vollständigen Laden dieser Seite auszuführen.
 Rufen Sie dazu mit draw_image(id, src, min, max, current, values) die zugrunde liegende und hier definierte Funktione auf.
 */


function drawThermometer(id, src, min, max, current, values) {
    $("div[data-device-id='" + id + "']").find(".device-image-container").svg("destroy");
    $("div[data-device-id='" + id + "']").find(".device-image-container").svg({
        loadURL:src,
        onLoad:function (svg) {
            svg.getElementById("tspan3817").textContent = ""+min;
            svg.getElementById("tspan3817-6").textContent = ""+max;

            if(current < min){
                current = min;
            }
            if(current > max){
                current = max;
            }
            var factor = (current-min)/(max-min);
            var offset = 323.58843 - (factor*(323.58843 - 50));
            var pathD = svg.getElementById("path3680").getAttribute("d");
            var split = pathD.split("323.58843");
            svg.change(svg.getElementById("path3680"),{d:split[0]+offset+split[1]});
        }
    });

    /* TODO
     Passen Sie die Höhe des Temperaturstandes entsprechend dem aktuellen Wert an.
     Beachten Sie weiters, dass auch die Beschriftung des Thermometers (max, min Temperatur) angepasst werden soll.
     */
}


function drawBulb(id, src, min, max, current, values) {
    $("div[data-device-id='" + id + "']").find(".device-image-container").svg("destroy");
    $("div[data-device-id='" + id + "']").find(".device-image-container").svg({
        loadURL:src,
        onLoad:function (svg) {
            if (current==1)
            {svg.change(svg.root(), {fill: "yellow"});}
        }
    });
}

function drawCam(id, src, min, max, current, values) {

    //CLONE FUNCTION NOT IMPLEMENTED YET!!!!!

    $("div[data-device-id='" + id + "']").find(".device-image-container").svg("destroy");
    $("div[data-device-id='" + id + "']").find(".device-image-container").svg({
        loadURL:src,
        onLoad:function (svg) {
            if (current==0){ //webcam off
                svg.change(svg.getElementById("circle8"),{style:"fill:black"});
                svg.change(svg.getElementById("path10"),{style:"fill:white"});
                //svg.clone($("#"+id));
            }
        }
    });

  /* TODO
    Verändern Sie die Darstellung der Webcam entsprechend den Vorgaben aus der Angabe.
    Dabei soll jedoch nicht nur einfach die Farbe der Elemente verändert werden, sondern es soll eine Kopie der zu verändernden Elemente erstellt
     und anschließend die aktuellen durch die angepassten Kopien ersetzt werden.
   */
}

function drawShutter(id, src, min, max, current, values) {
    $("div[data-device-id='" + id + "']").find(".device-image-container").svg("destroy");
    $("div[data-device-id='" + id + "']").find(".device-image-container").svg({
        loadURL:src,
        onLoad:function (svg) {
            if (current < 2) {
                svg.change(svg.getElementById("path4559-2-5"), { fill: "none" });//Level 4
                svg.change(svg.getElementById("path4559-2-6"), { fill: "none" })//Level 3
            }
            if (current < 1)
                svg.change(svg.getElementById("path4559-2"), { fill: "none" });//Level 2
        }
    });
}
