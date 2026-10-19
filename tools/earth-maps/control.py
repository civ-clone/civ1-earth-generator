# Civ1 tile (x, y) -> real (lat, lon). Tile coordinates are tile indices; the centre is +0.5.
# Longitudes east of the date line are unwrapped (> 180) so Asia -> Pacific is continuous.
CONTROL = [
    # North America
    ((1, 7), (65.5, -166.0)),    # Seward Peninsula
    ((4.5, 5), (71.3, -156.8)),  # Point Barrow
    ((4, 10), (57.0, -135.0)),   # Alaska panhandle
    ((4, 13), (49.0, -124.0)),   # Vancouver
    ((2, 17), (37.8, -122.5)),   # San Francisco
    ((2, 19), (34.0, -118.5)),   # Los Angeles
    ((2, 21), (23.0, -110.0)),   # Baja tip
    ((4.5, 23.5), (16.8, -99.9)),  # Acapulco
    ((5, 23), (19.4, -99.1)),    # Mexico City (Aztec start)
    ((8, 23), (21.5, -87.0)),    # Yucatan
    ((9, 26), (9.0, -79.5)),     # Panama
    ((9, 19.5), (29.0, -89.3)),  # Mississippi mouth
    ((11, 21), (25.2, -80.9)),   # Florida tip
    ((12.5, 23), (22.0, -79.5)), # Cuba
    ((13.5, 24), (19.0, -71.0)), # Hispaniola
    ((12, 18), (38.9, -77.0)),   # Washington (American start)
    ((13, 18), (35.2, -75.5)),   # Cape Hatteras
    ((14, 16), (40.7, -74.0)),   # New York
    ((18, 15), (44.6, -63.5)),   # Nova Scotia
    ((20, 14), (48.5, -56.0)),   # Newfoundland
    ((20, 10), (60.4, -64.4)),   # Cape Chidley
    ((15.5, 9.5), (60.0, -86.0)),  # Hudson Bay
    ((25, 9), (59.8, -43.9)),    # Cape Farewell
    ((31, 3), (81.5, -12.0)),    # NE Greenland
    ((24, 4), (78.0, -72.0)),    # NW Greenland
    ((30, 9), (64.9, -18.5)),    # Iceland
    ((8, 7), (69.0, -115.0)),    # Arctic coast
    ((13, 7), (68.5, -90.0)),    # Arctic coast
    # South America
    ((11, 27), (9.8, -71.6)),    # Lake Maracaibo
    ((16, 28), (9.0, -61.0)),    # Orinoco delta
    ((19.5, 30.5), (0.0, -50.0)),  # Amazon mouth
    ((23, 33), (-7.5, -35.0)),   # Recife
    ((21.5, 35), (-13.0, -38.5)),  # Salvador
    ((21, 37), (-23.0, -43.0)),  # Rio
    ((19, 39.5), (-35.0, -57.0)),  # River Plate
    ((18, 41), (-39.0, -62.0)),  # Bahia Blanca
    ((16, 46.5), (-55.5, -67.5)),  # Cape Horn
    ((15, 43), (-42.0, -74.0)),  # Chiloe
    ((14, 40), (-33.0, -71.6)),  # Valparaiso
    ((12.5, 36.5), (-18.5, -70.3)),  # Arica
    ((13.5, 38), (-23.6, -70.4)),  # Antofagasta
    ((16, 45.5), (-53.0, -71.0)),  # Punta Arenas
    ((16.5, 45), (-51.6, -69.2)),  # Rio Gallegos
    ((16.5, 43.5), (-45.9, -67.5)),  # Comodoro Rivadavia
    ((17, 42), (-42.5, -64.0)),  # Peninsula Valdes
    ((11.5, 34), (-12.0, -77.0)),  # Lima
    ((10.5, 31), (-2.2, -80.0)),  # Guayaquil
    # Europe
    ((30, 14), (50.0, -5.7)),    # Land's End
    ((31, 11), (58.6, -3.0)),    # John o'Groats
    ((31, 14), (51.5, -0.1)),    # London (English start)
    ((33, 15), (51.0, 1.9)),     # Calais
    ((33, 16), (48.85, 2.35)),   # Paris (French start)
    ((32, 16), (48.4, -4.8)),    # Brittany
    ((30, 18.5), (38.7, -9.1)),  # Lisbon
    ((31, 20), (36.0, -5.6)),    # Gibraltar
    ((35, 13), (56.0, 9.0)),     # Jutland
    ((35, 11), (58.0, 7.5)),     # Norway south tip
    ((36, 10), (60.4, 5.3)),     # Bergen
    ((39, 8), (71.0, 25.8)),     # North Cape
    ((38, 15), (52.5, 13.4)),    # Berlin (German start)
    ((36, 19), (41.9, 12.5)),    # Rome (Roman start)
    ((37, 20), (38.0, 15.7)),    # Toe of Italy
    ((39, 18), (38.0, 23.7)),    # Athens (Greek start)
    ((44, 12), (55.75, 37.6)),   # Moscow (Russian start)
    ((42, 18.5), (41.0, 29.0)),  # Bosporus
    ((43, 18), (43.0, 34.0)),    # Black Sea
    ((47, 17.5), (42.0, 51.0)),  # Caspian
    # Africa / Middle East
    ((30, 21), (35.8, -5.8)),    # Tangier
    ((37, 22), (36.8, 10.2)),    # Tunis
    ((38, 22.5), (31.0, 18.0)),  # Gulf of Sidra
    ((41, 22.5), (31.3, 30.0)),  # Nile delta
    ((43, 23.5), (30.0, 32.5)),  # Suez
    ((43, 21), (33.9, 35.5)),    # Beirut
    ((45, 22), (32.5, 44.4)),    # Babylon (Babylonian start)
    ((47, 23.5), (27.0, 51.0)),  # Persian Gulf
    ((50, 26), (22.5, 59.8)),    # Ras al Hadd
    ((48, 29), (12.8, 45.0)),    # Aden
    ((47.5, 30.5), (11.8, 51.3)),  # Cape Guardafui
    ((29, 23), (28.0, -12.9)),   # Cape Juby
    ((27, 27), (14.7, -17.4)),   # Dakar
    ((28, 30), (8.5, -13.2)),    # Freetown
    ((33.5, 32.2), (6.4, 3.4)),  # Lagos
    ((31, 31.8), (5.6, -0.2)),   # Accra
    ((35, 32), (4.0, 9.5)),      # Cameroon
    ((36, 36), (-6.0, 12.3)),    # Congo mouth
    ((37, 41), (-23.0, 14.5)),   # Walvis Bay
    ((38, 46), (-34.0, 18.5)),   # Cape of Good Hope
    ((41, 45), (-34.0, 25.6)),   # Port Elizabeth
    ((42, 43.5), (-30.0, 31.0)), # Durban
    ((42, 42), (-28.3, 31.4)),   # Ulundi (Zulu start)
    ((45, 39), (-19.8, 34.8)),   # Beira
    ((44, 35.5), (-6.8, 39.3)),  # Dar es Salaam
    ((46, 32.5), (2.0, 45.3)),   # Mogadishu
    ((47, 39), (-12.0, 49.3)),   # Madagascar north
    ((46, 43), (-25.5, 45.0)),   # Madagascar south
    # Asia
    ((54, 24), (24.8, 67.0)),    # Indus mouth
    ((55.5, 26.5), (19.0, 72.8)),  # Mumbai
    ((57, 30), (8.0, 77.5)),     # Cape Comorin
    ((60.5, 25.5), (22.0, 90.0)),  # Ganges delta
    ((66, 19), (39.9, 116.4)),   # Beijing (Chinese start)
    ((69.5, 22), (31.4, 122.0)), # Yangtze mouth
    ((67.5, 25), (22.3, 114.0)), # Hong Kong
    ((65.5, 29.5), (1.3, 104.0)),  # Singapore
    ((69, 18), (34.5, 127.0)),   # Korea south
    ((73, 18.5), (35.7, 139.7)), # Tokyo
    ((71, 20), (23.7, 121.0)),   # Taiwan
    ((71, 25), (16.0, 121.0)),   # Luzon
    ((72.5, 31), (7.5, 125.0)),  # Mindanao
    ((73, 12), (51.0, 156.7)),   # Kamchatka
    ((74.5, 7.5), (66.0, 190.0)), # Chukotka
    ((52, 4), (77.0, 104.0)),    # Taimyr
    ((60, 6), (72.0, 128.0)),    # Lena delta
    # Indonesia / Australia
    ((63, 32), (5.5, 95.3)),     # Banda Aceh
    ((65, 35), (-6.2, 106.8)),   # Jakarta
    ((66, 36), (-8.0, 114.0)),   # East Java
    ((68, 31.5), (1.0, 114.0)),  # Borneo
    ((70.5, 32.5), (-2.0, 121.0)),  # Sulawesi
    ((72, 32), (-1.0, 132.0)),   # Vogelkop
    ((78, 34), (-10.0, 150.0)),  # New Guinea east
    ((75, 36.5), (-10.7, 142.5)),  # Cape York
    ((71, 37), (-12.5, 131.0)),  # Darwin
    ((67, 40), (-21.8, 114.2)),  # North West Cape
    ((67, 44), (-34.4, 115.1)),  # Cape Leeuwin
    ((70.5, 44.5), (-33.0, 130.0)),  # Great Australian Bight
    ((74.5, 45.5), (-39.0, 146.4)),  # Wilsons Promontory
    ((74.5, 46.5), (-42.5, 147.0)),  # Tasmania
    ((78, 41), (-27.5, 153.0)),  # Brisbane
    ((77, 43.5), (-33.9, 151.2)),  # Sydney
    # refinements
    ((2.5, 7.8), (58.0, -155.0)),  # Alaska Peninsula
    ((4.5, 7.8), (61.2, -150.0)),  # Anchorage
    ((5, 8.5), (59.5, -139.7)),  # Yakutat
    ((3, 20.5), (28.0, -111.5)), # Gulf of California
    ((4, 22), (23.2, -106.4)),   # Mazatlan
    ((20, 4), (80.0, -80.0)),    # Ellesmere
    ((37.5, 11.5), (59.3, 18.1)),  # Stockholm
    ((39, 11), (60.2, 25.0)),    # Helsinki
    ((42.5, 10.5), (65.5, 37.0)),  # White Sea
    ((34.3, 17.9), (43.3, 5.4)), # Marseille
    ((33.9, 18.3), (41.4, 2.2)), # Barcelona
    ((33, 19), (39.5, -0.4)),    # Valencia
    ((32, 19.8), (36.8, -2.5)),  # Almeria
    ((43, 24), (28.5, 33.0)),    # Gulf of Suez
    ((43, 25), (25.0, 35.5)),    # Red Sea
    ((43.5, 26), (22.0, 37.5)),  # Red Sea
    ((44.5, 27), (18.5, 39.5)),  # Red Sea
    ((45.5, 28), (15.0, 41.5)),  # Red Sea
    ((46.5, 29), (12.7, 43.4)),  # Bab-el-Mandeb
    ((48.5, 24.5), (26.5, 56.3)),  # Hormuz
    ((51, 24), (25.3, 60.0)),    # Makran coast
    ((43, 41), (-26.0, 32.6)),   # Maputo
    ((63.5, 27.5), (13.7, 100.5)),  # Bangkok
    ((66, 28.5), (9.5, 106.0)),  # Mekong delta
    ((66.5, 26.5), (16.0, 108.2)),  # Da Nang
    ((67, 31.5), (0.0, 109.3)),  # Pontianak
    ((68, 33), (-3.3, 114.6)),   # Banjarmasin
    ((64, 33), (-1.0, 100.3)),   # Padang
    ((76.5, 32.6), (-3.5, 143.0)),  # New Guinea north
    ((76, 34.6), (-8.0, 141.0)), # New Guinea south
    ((78.5, 34.5), (-10.5, 150.5)),  # New Guinea east tip
    ((69, 39), (-18.0, 122.2)),  # Broome
]
