    const stops = [
        ["Southeastern Wilderness","399,96", "A planes biome with a Woodland Mansion, a Bearclaw Inn, and a village nearby."],
        ["Northwestern Wilderness","-50,-548", "A snowy forest with a Born in Chaos tower and an abandoned railcar nearby."],
        ["Scarlett's Base","-3,-238", "The hobbit hole where Scarlett and Emmett live."],
        ["Country of Harley","11,-20", "Sebastian's island nation. He is digging a big hole there (no one knows why)."],
        ["Nice Island Nation","193,-552", "Elias's base. Struck by a tornado, an ice dragon, and a nuclear bomb on three unrelated occasions."],
        ["Matthew's Base","21,288", "The first stop ever built. Featuring villagers and a skeleton farm!!"],
        ["Eastern Checkpoint","429,-262", "A strategically placed stop for easier access."],
        ["Central Checkpoint","243,-107", "A strategically placed stop for easier access."],
        ["Southern Checkpoint","268,306", "A strategically placed stop for easier access."],
        ["Northern Checkpoint","431,-507", "A strategically placed stop for easier access."],

      ];
    let closestStop = "[Invalid Coords]";
    let closestStopCoords = "0,0";
    let closestStopDistance = 0;
    
    function popTable() {
        for (const stop of stops) {
            document.getElementById("stopTable").innerHTML += "<tr>" + "<td>" + stop[0] + "</td>" + "<td>" + stop[1] + "</td>" + "<td>" + stop[1].replace(" ","").split(",")[0]*8 + "," +stop[1].replace(" ","").split(",")[1]*8 + "</td>" + "<td>" + stop[2] + "</td>" + "<td>" + "</td>" + "<tr>";
        }
    }
    
    function compute_distance(x1, y1, x2, y2) {
      return Math.sqrt((x2*8 - x1) ** 2 + (y2*8 - y1) ** 2)  
    }


    function compute_distance_string(c1, c2) {
      const [x1, y1] = c1.replace(" ","").split(",");
      const [x2, y2] = c2.replace(" ","").split(",");
      console.log("x1: " + x1 + " y1: " + y1 + " x2: " + x2 + " y2: " + y2);
      return compute_distance(x1, y1, x2, y2);
    }

    function findStop() {
      const c1 = document.getElementById("coords").value;
      let closest = "[Invalid Coords]";
      let min = Infinity;
      let coords = "";
      for (const stop of stops) {
        const distance = compute_distance_string(c1, stop[1]);
        if (distance < min) {
          closest = stop[0];
          coords = stop[1];
          min = distance;
        }
      }
      closestStop = closest
      closestStopCoords = coords;
      closestStopDistance = Math.floor(min);

      document.getElementById("result1").innerHTML = "The closest stop to the coordinates you entered is <b>" + closestStop + "</b>, which is <b>" + closestStopDistance + " blocks away through the Overworld</b>";
      document.getElementById("result2").innerHTML = closestStop + " is located at <b>" + closestStopCoords + "</b> in the Nether, or <b>" +closestStopCoords.replace(" ","").split(",")[0]*8 + "," +closestStopCoords.replace(" ","").split(",")[1]*8+"</b> in the Overworld";
    }

    function findStopFrom(x, y) {
        let c1 = x + "," + y
        let min = Infinity;
        for (const stop of stops) {
            const distance = compute_distance_string(c1, stop[1]);
            if (distance < min) {
                min = distance;
            }
        }
        return min
    }
   function findFarthestCoords() {
    const x2 = 3500; 
    const y2 = 2500;
    const x1 = -400; const y1 = -4500;
    const region_size = 50;
    let dictionary = {0: [""]};
    for (let x = x1; x < x2; x += region_size) {
        for (let y = y1; y < y2; y += region_size) {
            const dist = Math.floor(findStopFrom(x, y));
            if (dictionary[dist] == null) {
                dictionary[dist] = ["(" + Math.floor(x/8) + "," + Math.floor(y/8) + ")"];
            }
            else {
                dictionary[dist].push(" (" + Math.floor(x/8) + "," + Math.floor(y/8) + ")");       
            }
          }
        }
    return dictionary;   
    }
    function popOptimTable() {
        const dictionary = findFarthestCoords();
        const keys = Object.keys(dictionary).sort(function(a, b) {
          return b - a
        });
        for (const i of keys) {
            document.getElementById("optimTable").innerHTML += "<tr>" + "<td>" + i + "</td>" + "<td>" + dictionary[i] + "</td>" + "<tr>";
        }
    }

