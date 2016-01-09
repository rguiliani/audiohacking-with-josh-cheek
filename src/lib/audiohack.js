window.oscillators = [];

var AudioContext = window.AudioContext || window.webkitAudioContext;
var context      = new AudioContext();
var destination  = context.destination;

chords = [
//    [448,560,672],
    [440,550,660]
];

// osc (modified by periodic wave) -> gain -> convolver  -> speakers (aka context.destination)
chords.forEach(function(freqs) {
    freqs.forEach(function(freq) {
        // osc
        var oscillator = context.createOscillator();
        window.oscillators.push(oscillator);

        // periodic wave
        // var real = new Float32Array(2);
        // var imag = new Float32Array(2);
        // real[0] = 0.5;
        // imag[0] = 0;
        // real[1] = 1;
        // imag[1] = 0;
        // var wave = context.createPeriodicWave(real, imag, {disableNormalization: true});
        // oscillator.setPeriodicWave(wave);

        // osc -> gain
        var gain     = context.createGain();
        var volume   = gain.gain;
        oscillator.frequency.value = freq;
        volume.value = 0;

        oscillator.connect(gain);
        gain.connect(destination);

        oscillator.start();
        volume.value = 1;

        // gain -> conv 
        var convolver = context.createConvolver(); 
        gain.connect(convolver);

        // conv ->out
        convolver.connect(destination);
    });
});
