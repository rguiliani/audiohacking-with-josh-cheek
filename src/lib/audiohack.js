    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

function Oscillator (frequency, destination) {
    var oscillator = this.oscillator = context.createOscillator();
    var gain = context.createGain();
    var volume = this.volume = gain.gain;

    oscillator.frequency.value = frequency;
    volume.value = 0;

    oscillator.connect(gain);
    gain.connect(destination);

    oscillator.start(0);

    this.start = function() { this.volume.value = 1; };
    this.stop = function() { this.volume.value = 0; };
};

function Convolver(input, output) {
    this.convolver = context.createConvolver(); //node i/o
    input.connect(this.convolver);
    this.convolver.connect(output);
}

function PeriodicWave (osc) {
    real[0] = 0;
    imag[0] = 0;
    real[1] = 1;
    imag[1] = 0;

    var wave = context.createPeriodicWave(real, imag, {disableNormalization: true});
    osc.setPeriodicWave(wave);
}
chords = [
//    [448,560,672],
    [440,550,660]
];

chords.forEach(function(freqs) {
    freqs.forEach(function(freq) {
        var osc = new Oscillator(freq);
        Convolver(osc, context.destination);
        PeriodicWave(osc)

        osc.start();
    });
});


