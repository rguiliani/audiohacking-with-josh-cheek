function Oscillator (frequency) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    var destination = context.destination;
    var oscillator = this.oscillator = context.createOscillator();
    var gain = context.createGain();
    var convolver = context.createConvolver(); //node i/o
    var volume = this.volume = gain.gain;

    oscillator.frequency.value = frequency;
    volume.value = 0;

    oscillator.connect(gain);
    gain.connect(destination);
    //convolver.connect(destination);

    oscillator.start(0);

    this.start = function() { this.volume.value = 1; };
    this.stop = function() { this.volume.value = 0; };
};

chords = [
//    [448,560,672],
    [440,550,660]
];

chords.forEach(function(freqs) {
    freqs.forEach(function(freq) {
    osc = new Oscillator(freq);

    osc.start();
    });
});


