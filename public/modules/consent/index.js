(function() {
  var data    = {}
    , workers = null;

  init();

  function init() {
    experimentr.hideNext();

    // load previous workers file
    d3.json('modules/consent/blocked-workers.json', function(err, d) {
      workers = d;
      d3.select('#workerId').attr('disabled', null);
    });

    d3.selectAll('#workerId')
      .on('keypress', function() { data.workerId = this.value; })
      .on('blur', function() { data.workerId = this.value; });

    d3.select('#consentYes').on('click', experimentr.next);

    d3.select('#checkId').on('click', validate);
    d3.select('#readCheck').on('click', validate);
    scenario();
  }

  function validate() {
    if( data.workerId ) {
      experimentr.addData(data);

      if(workers.indexOf(data.workerId) == -1 && document.getElementById("readCheck").checked ) {
        d3.select('#consentYes').attr('disabled', null);
        d3.select('#notChecked').style('display', 'none');
        d3.select('#invalidMessage').style('display', 'none');
      } else if(workers.indexOf(data.workerId) != -1) {
          d3.select('#notChecked').style('display', 'none');
          d3.select('#invalidMessage').style('display', 'inline');
      } else if(!document.getElementById("readCheck").checked) {
          d3.select('#notChecked').style('display', 'inline');
          d3.select('#invalidMessage').style('display', 'none');
      } 
      
    }
  }

  function scenario(){
    var scenario = document.getElementById("scenario");
    var scenarioNum = Math.floor((Math.random() * 5) + 1);
    switch(scenarioNum){
      case 1:
        scenario.innerText = "You are an Elderly Person (over 60) with Type-1 Diabetes. You are currently in the hospital recovering from a bad fall you had earlier in the week. You’re incapable of moving in your current state and are bed ridden.";
        data.scenario = "You are an Elderly Person (over 60) with Type-1 Diabetes. You are currently in the hospital recovering from a bad fall you had earlier in the week. You’re incapable of moving in your current state and are bed ridden.";
        break;
      case 2:
        scenario.innerText = "You are a child (10 years or younger) with Type-1 Diabetes. You’re healthy and moderately fit. You are at the grocery store and have lost sight of your parents. The grocery store is very busy and packed with people.";
        data.scenario = "You are a child (10 years or younger) with Type-1 Diabetes. You’re healthy and moderately fit. You are at the grocery store and have lost sight of your parents. The grocery store is very busy and packed with people.";
        break;
      case 3:
        scenario.innerText = "You are a 40 year old obese woman with Type-1 Diabetes. You’re riding a scooter in a shopping mall.";
        data.scenario = "You are a 40 year old obese woman with Type-1 Diabetes. You’re riding a scooter in a shopping mall.";
        break;
      case 4:
        scenario.innerText = "You’re a 21 year old man, healthy and fit. You are in a lecture hall in college, taking a final that will determine if you stay in school or not.";
        data.scenario = "You’re a 21 year old man, healthy and fit. You are in a lecture hall in college, taking a final that will determine if you stay in school or not.";
        break;
      case 5:
        scenario.innerText = "You are a fit 20-year-old woman with Type-1 Diabetes. You have extremely healthy eating habits and great physical health. You’re currently participating in a session at a Crossfit gym with your family.";
        data.scenario = "You are a fit 20-year-old woman with Type-1 Diabetes. You have extremely healthy eating habits and great physical health. You're currently participating in a session at a Crossfit gym with your family.";
        break;
    }
    experimentr.addData(data);
  }

}());


