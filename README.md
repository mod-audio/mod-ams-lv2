ams-lv2
=======

This a sub-set of LV2 plugins that is a port of the internal modules found in Alsa Modular Synth [http://alsamodular.sourceforge.net/](http://alsamodular.sourceforge.net/).
The modules in this repository are optimized for the use on the MOD. The most notible difference is that the ranges of the CV signal is changes from -1/+1 to -5/+5.

This repository contains the following plugins:
- VCO
- VCF
- VCA
- LFO
- Envelope
- Percussive Envelope
- Sequencer 8 Steps


INSTALL
-------

	$  ./waf configure
	$  ./waf
	$  ./waf install
