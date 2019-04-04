
var name = "";

var total = 0;
var wrong = 0;

var welcome = {
	type: "html-keyboard-response",
	stimulus: "Welcome to the experiment. Press any key to begin."
};

var instructions = {
	type: "html-keyboard-response",
	stimulus: "<p>In this experiment, a series of four boxes will appear in the center " +
      "of the screen.</p><p>If the box is <strong>solid</strong>, " +
      "press the letter on the keyboard that corresponds to it's position as fast as you can.</p>" +
      "<p>Position 1 = D, Position 2 = F, Position 3 = J, Position 4 = K</p>" +
      "<img style='width: 300px;' src='img/1.png'></img>" +
      "<p class='small' style='margin-top: -.5rem;'><strong>Press the D key</strong></p></div>" +
      "<img style='width: 300px;' src='img/2.png'></img>" +
      "<p class='small' style='margin-top: -.5rem;'><strong>Press the F key</strong></p></div>" +
      "<img style='width: 300px;' src='img/3.png'></img>" +
      "<p class='small' style='margin-top: -.5rem;'><strong>Press the J key</strong></p></div>" +
      "<img style='width: 300px;' src='img/4.png'></img>" +
      "<p class='small' style='margin-top: -.5rem;'><strong>Press the K key</strong></p></div>" +
      "<p>Press any key to begin.</p>",
      post_trial_gap: 250
};

var timeline = [];

var test_stimuli_1 = [
  { stimulus: "img/1.png", data: {test_part: 'test', correct_response: 'd'}},
  { stimulus: "img/2.png", data: {test_part: 'test', correct_response: 'f'}},
  { stimulus: "img/3.png", data: {test_part: 'test', correct_response: 'j'}},
  { stimulus: "img/4.png", data: {test_part: 'test', correct_response: 'k'}}
];

var trial_1 = {
  type: 'image-keyboard-response',
  stimulus: "img/1.png",
  choices: ['d', 'f', 'j', 'k'],
};

var trial_2 = {
  type: 'image-keyboard-response',
  stimulus: 'img/2.png',
  choices: ['d', 'f', 'j', 'k'],
};

var trial_3 = {
  type: 'image-keyboard-response',
  stimulus: 'img/3.png',
  choices: ['d', 'f', 'j', 'k'],
};

var trial_4 = {
  type: 'image-keyboard-response',
  stimulus: 'img/4.png',
  choices: ['d', 'f', 'j', 'k'],
};

var test = {
      type: "image-keyboard-response",
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: ['d', 'f', 'j', 'k'],
      data: jsPsych.timelineVariable('data'),
      on_finish: function(data){
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
      }
};

var test_procedure = {
  timeline: [trial_1],
  data: jsPsych.timelineVariable('data'),
  loop_function: function(data){
    document.body.style.backgroundColor = "white";
    if(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('d') == data.values()[0].key_press){
      document.getElementById('message').innerHTML = "Correct!";
      data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('d');
      total++;
      return false;
    } else {
      document.getElementById('message').innerHTML = "Wrong.";
      total++;
      wrong++;
      return true;
    }
  },
};

var test_procedure_1 = {
  timeline: [trial_2],
  data: jsPsych.timelineVariable('data'),
  loop_function: function(data){
    document.body.style.backgroundColor = "rgba(100,0,0,.5)";
    if(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f') == data.values()[0].key_press){
      document.getElementById('message').innerHTML = "Correct!";
      data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f');
      total++;
      return false;
    } else {
      document.getElementById('message').innerHTML = "Wrong.";
      total++;
      wrong++;
      return true;
    }
  },
};

var test_procedure_2 = {
  timeline: [trial_3],
  data: jsPsych.timelineVariable('data'),
  loop_function: function(data){
    document.body.style.backgroundColor = "rgba(0,100,0,.5)";
    if(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j') == data.values()[0].key_press){
      document.getElementById('message').innerHTML = "Correct!";
      data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j');
      total++;
      return false;
    } else {
      document.getElementById('message').innerHTML = "Wrong.";
      total++;
      wrong++;
      return true;
    }
  },
};

var test_procedure_3 = {
  timeline: [trial_4],
  data: jsPsych.timelineVariable('data'),
  loop_function: function(data){
    document.body.style.backgroundColor = "rgba(0,0,100,.5)";
    if(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('k') == data.values()[0].key_press){
      document.getElementById('message').innerHTML = "Correct!";
      data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('k');
      total++;
      return false;
    } else {
      document.getElementById('message').innerHTML = "Wrong.";
      total++;
      wrong++;
      return true;
    }
  },
};

var debrief_block = {
  type: "html-keyboard-response",
  stimulus: function() {

    /*var trials = jsPsych.data.get().filter({test_part: 'test'});
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());*/
    if(wrong == total){
      var accuracy = 0;
    } else {
      var accuracy = Math.round((total - wrong) / total * 100);
    }
    document.getElementById('message').innerHTML = "";

    return "<p>You responded correctly on "+accuracy+"% of the trials.</p>"+
    "<p>Press any key to complete the experiment. Thank you!</p>";

  },
  response_ends_trial: false
};

var sequence = {
  timeline:[test_procedure_1, test_procedure_2, test_procedure, test_procedure_3, test_procedure_2, test_procedure_1, test_procedure_3, 
  test_procedure, test_procedure_2, test_procedure_3, test_procedure_1, test_procedure],
  repetitions: 3
}

function startExperiment() {
	timeline.push(welcome);
	timeline.push(instructions);
  timeline.push(sequence);
  timeline.push(debrief_block);


	jsPsych.init({
		timeline: timeline,
		on_finish: function() {
			jsPsych.data.addProperties({subject: 1, condition: 'control', Accuracy: getAccuracy(), AvgResponseTime: getAvgResponseTime()});
			var data = jsPsych.data.get().filter({'test_part': 'test'}).ignore('internal_node_id').ignore('stimulus').ignore('rt').ignore('trial_type').ignore('test_part').csv();
			//writeToFile(data, 'text.csv');
		}
	});
}

function writeToFile(data, filename) {
    if (!data) {
        console.error('Console.save: No data')
        return;
    }

    if (!filename) filename = 'noname.txt'

    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4)
    }

    
    var blob = new Blob([data], {
            type: 'text/json'
        }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}

function getAccuracy(){
	var trials = jsPsych.data.get().filter({test_part: 'test'});
    var correct_trials = trials.filter({correct: true});
	var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
	return accuracy;
}

function getAvgResponseTime(){
	var trials = jsPsych.data.get().filter({test_part: 'test'});
    var correct_trials = trials.filter({correct: true});
    var rt = Math.round(correct_trials.select('rt').mean());
    return rt;
}

startExperiment();


