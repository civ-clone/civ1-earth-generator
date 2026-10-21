"""Civilization's own 80 x 50 Earth terrain, read from `Maps/Earth80x50.ts`."""
import os
import re

_SOURCE = os.path.join(os.path.dirname(__file__), '..', '..', 'Maps', 'Earth80x50.ts')
_text = open(_SOURCE).read()

TERRAIN = re.search(r'terrain: `([A-Z\n]+)`', _text).group(1).split()
