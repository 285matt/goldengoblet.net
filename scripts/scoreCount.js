// JavaScript source code

/* automatic medal totaller
 * 
 * Assumes Totals table is set up but scores have not been populated.  Will work on Totals table that is populated too though.
 * Contains code to copy player names to the totals table but has been commented out.  Feel free to uncomment.
 * Points not tallied as there's no easy way to differentiate a score (27,200) and a different quantifier (2 Targets, for example)
 * If these were split out into different elements, or sub elements (<td>12,000</td><td>0<span class="comment">2 Targets</span></td>)
 * then it would be easier to tally and populate totals.
 * */

//init variables
let firstCount = 0, secondCount = 0, thirdCount = 0, points = 0, pointsTemp = 0;

let playerNameAndLink = '';

//loop through each column that contains scores.  First column contains episode # so we skip it.
for (let i = 2; i <= 4; i++) {
    playerNameAndLink = $('table:nth-child(3) > thead > tr > th:nth-child(' + i + ') > a').clone();
    //go through each row and tally up the scores.
    $('table:nth-child(3) > tbody > tr > td:nth-child(' + i + ')').each(function (a, b) {
        if ($(this).hasClass('first')) {
            firstCount++;
        }
        else if ($(this).hasClass('second')) {
            secondCount++;
        }
        else if ($(this).hasClass('third')) {
            thirdCount++;
        }
        if (!$(this).hasClass("comment")) {
            // If the row is not part of the "comment" class
            // Assign pointsTemp to itself plus the value of the row, with any commas removed, and converted to a floating point
            pointsTemp += parseFloat(($(this).text().replace(",","")));
            // Points is equal to pointsTemp, but uses this regex to add the commas back into the number
            points = pointsTemp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        $('table:nth-child(4) > thead > tr > th:nth-child(' + i + ')').html(playerNameAndLink);
        //insert the scores into the relevant medal tally
        $('table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(' + i + ')').text(thirdCount);
        $('table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(' + i + ')').text(secondCount);
        $('table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(' + i + ')').text(firstCount);
        $('table:nth-child(4) > tbody > tr:nth-child(4) > td:nth-child(' + i + ')').text(points);
        

    })
    //reset the medal count for the next player
    firstCount = 0, secondCount = 0, thirdCount = 0, points = 0, pointsTemp = 0;
}