// Mock FIPE data for demonstration
// This will be replaced with actual FIPE API integration

export interface FipeCategory {
  id: string
  name: string
  slug: string
}

export interface FipeBrand {
  id: string
  name: string
  slug: string
  categoryId: string
}

export interface FipeModel {
  id: string
  name: string
  slug: string
  brandId: string
  years: number[]
}

export interface FipePrice {
  id: string
  modelId: string
  year: number
  price: number
  fipeCode: string
  brand: string
  model: string
  priceHistory: PriceHistoryPoint[]
}

export interface PriceHistoryPoint {
  month: string
  price: number
  change: number
}

// FIPE Categories (mock data)
export const FIPE_CATEGORIES: FipeCategory[] = [
  { id: '1', name: 'Carros', slug: 'carros' },
  { id: '2', name: 'Motos', slug: 'motos' },
  { id: '3', name: 'Caminhões', slug: 'caminhoes' },
]

// FIPE Brands (mock data)
export const FIPE_BRANDS: FipeBrand[] = [
  // Carros (categoryId: 1)
  { id: '1', name: 'Fiat', slug: 'fiat', categoryId: '1' },
  { id: '2', name: 'Volkswagen', slug: 'volkswagen', categoryId: '1' },
  { id: '3', name: 'Ford', slug: 'ford', categoryId: '1' },
  { id: '4', name: 'Chevrolet', slug: 'chevrolet', categoryId: '1' },
  { id: '5', name: 'Hyundai', slug: 'hyundai', categoryId: '1' },
  { id: '6', name: 'Renault', slug: 'renault', categoryId: '1' },
  { id: '7', name: 'Peugeot', slug: 'peugeot', categoryId: '1' },
  { id: '8', name: 'Honda', slug: 'honda', categoryId: '1' },
  { id: '9', name: 'Toyota', slug: 'toyota', categoryId: '1' },
  { id: '10', name: 'Citroën', slug: 'citroen', categoryId: '1' },
  { id: '11', name: 'Jeep', slug: 'jeep', categoryId: '1' },
  { id: '12', name: 'Nissan', slug: 'nissan', categoryId: '1' },
  { id: '13', name: 'Mitsubishi', slug: 'mitsubishi', categoryId: '1' },
  { id: '14', name: 'Kia', slug: 'kia', categoryId: '1' },
  { id: '15', name: 'BMW', slug: 'bmw', categoryId: '1' },
  { id: '16', name: 'Mercedes-Benz', slug: 'mercedes-benz', categoryId: '1' },
  { id: '17', name: 'Audi', slug: 'audi', categoryId: '1' },
  { id: '18', name: 'Volvo', slug: 'volvo', categoryId: '1' },
  { id: '19', name: 'Land Rover', slug: 'land-rover', categoryId: '1' },
  { id: '20', name: 'Caoa Chery', slug: 'caoa-chery', categoryId: '1' },
  { id: '21', name: 'BYD', slug: 'byd', categoryId: '1' },
  { id: '22', name: 'GWM', slug: 'gwm', categoryId: '1' },
  { id: '23', name: 'RAM', slug: 'ram', categoryId: '1' },
  { id: '24', name: 'Porsche', slug: 'porsche', categoryId: '1' },
  { id: '25', name: 'Subaru', slug: 'subaru', categoryId: '1' },
  // Motos (categoryId: 2)
  { id: '101', name: 'Honda Motos', slug: 'honda-motos', categoryId: '2' },
  { id: '102', name: 'Yamaha', slug: 'yamaha', categoryId: '2' },
  { id: '103', name: 'Suzuki', slug: 'suzuki', categoryId: '2' },
  { id: '104', name: 'Kawasaki', slug: 'kawasaki', categoryId: '2' },
  { id: '105', name: 'BMW Motorrad', slug: 'bmw-motorrad', categoryId: '2' },
  { id: '106', name: 'Harley-Davidson', slug: 'harley-davidson', categoryId: '2' },
  { id: '107', name: 'Triumph', slug: 'triumph', categoryId: '2' },
  { id: '108', name: 'Ducati', slug: 'ducati', categoryId: '2' },
  { id: '109', name: 'Royal Enfield', slug: 'royal-enfield', categoryId: '2' },
  { id: '110', name: 'Shineray', slug: 'shineray', categoryId: '2' },
  { id: '111', name: 'Dafra', slug: 'dafra', categoryId: '2' },
  { id: '112', name: 'Haojue', slug: 'haojue', categoryId: '2' },
  // Caminhoes (categoryId: 3)
  { id: '201', name: 'Mercedes-Benz Caminhoes', slug: 'mercedes-benz-caminhoes', categoryId: '3' },
  { id: '202', name: 'Volvo Caminhoes', slug: 'volvo-caminhoes', categoryId: '3' },
  { id: '203', name: 'Scania', slug: 'scania', categoryId: '3' },
  { id: '204', name: 'Volkswagen Caminhoes', slug: 'volkswagen-caminhoes', categoryId: '3' },
  { id: '205', name: 'DAF', slug: 'daf', categoryId: '3' },
  { id: '206', name: 'Iveco', slug: 'iveco', categoryId: '3' },
  { id: '207', name: 'MAN', slug: 'man', categoryId: '3' },
  { id: '208', name: 'Ford Caminhoes', slug: 'ford-caminhoes', categoryId: '3' },
]

// FIPE Models (mock data)
export const FIPE_MODELS: FipeModel[] = [
  // === CARROS ===
  // Fiat (brandId: 1)
  { id: '1', name: 'Uno', slug: 'uno', brandId: '1', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2', name: 'Argo', slug: 'argo', brandId: '1', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '3', name: 'Cronos', slug: 'cronos', brandId: '1', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '4', name: 'Mobi', slug: 'mobi', brandId: '1', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '5', name: 'Toro', slug: 'toro', brandId: '1', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '6', name: 'Strada', slug: 'strada', brandId: '1', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '7', name: 'Pulse', slug: 'pulse', brandId: '1', years: [2022, 2023, 2024, 2025] },
  { id: '8', name: 'Fastback', slug: 'fastback', brandId: '1', years: [2023, 2024, 2025] },
  // Volkswagen (brandId: 2)
  { id: '10', name: 'Gol', slug: 'gol', brandId: '2', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { id: '11', name: 'Polo', slug: 'polo', brandId: '2', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '12', name: 'Virtus', slug: 'virtus', brandId: '2', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '13', name: 'T-Cross', slug: 't-cross', brandId: '2', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '14', name: 'Nivus', slug: 'nivus', brandId: '2', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '15', name: 'Taos', slug: 'taos', brandId: '2', years: [2022, 2023, 2024, 2025] },
  { id: '16', name: 'Saveiro', slug: 'saveiro', brandId: '2', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '17', name: 'Amarok', slug: 'amarok', brandId: '2', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Ford (brandId: 3)
  { id: '20', name: 'Ka', slug: 'ka', brandId: '3', years: [2018, 2019, 2020, 2021] },
  { id: '21', name: 'Ka Sedan', slug: 'ka-sedan', brandId: '3', years: [2018, 2019, 2020, 2021] },
  { id: '22', name: 'EcoSport', slug: 'ecosport', brandId: '3', years: [2018, 2019, 2020, 2021, 2022] },
  { id: '23', name: 'Ranger', slug: 'ranger', brandId: '3', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '24', name: 'Bronco Sport', slug: 'bronco-sport', brandId: '3', years: [2022, 2023, 2024, 2025] },
  { id: '25', name: 'Maverick', slug: 'maverick', brandId: '3', years: [2023, 2024, 2025] },
  { id: '26', name: 'Territory', slug: 'territory', brandId: '3', years: [2021, 2022, 2023, 2024, 2025] },
  // Chevrolet (brandId: 4)
  { id: '30', name: 'Onix', slug: 'onix', brandId: '4', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '31', name: 'Onix Plus', slug: 'onix-plus', brandId: '4', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '32', name: 'Tracker', slug: 'tracker', brandId: '4', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '33', name: 'S10', slug: 's10', brandId: '4', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '34', name: 'Montana', slug: 'montana', brandId: '4', years: [2023, 2024, 2025] },
  { id: '35', name: 'Spin', slug: 'spin', brandId: '4', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '36', name: 'Equinox', slug: 'equinox', brandId: '4', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '37', name: 'Trailblazer', slug: 'trailblazer', brandId: '4', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Hyundai (brandId: 5)
  { id: '40', name: 'HB20', slug: 'hb20', brandId: '5', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '41', name: 'HB20S', slug: 'hb20s', brandId: '5', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '42', name: 'Creta', slug: 'creta', brandId: '5', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '43', name: 'Tucson', slug: 'tucson', brandId: '5', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '44', name: 'Santa Fe', slug: 'santa-fe', brandId: '5', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Renault (brandId: 6)
  { id: '50', name: 'Kwid', slug: 'kwid', brandId: '6', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '51', name: 'Sandero', slug: 'sandero', brandId: '6', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: '52', name: 'Logan', slug: 'logan', brandId: '6', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: '53', name: 'Duster', slug: 'duster', brandId: '6', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '54', name: 'Captur', slug: 'captur', brandId: '6', years: [2018, 2019, 2020, 2021, 2022] },
  { id: '55', name: 'Oroch', slug: 'oroch', brandId: '6', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Peugeot (brandId: 7)
  { id: '60', name: '208', slug: '208', brandId: '7', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '61', name: '2008', slug: '2008', brandId: '7', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '62', name: '3008', slug: '3008', brandId: '7', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '63', name: '5008', slug: '5008', brandId: '7', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Honda (brandId: 8)
  { id: '70', name: 'Civic', slug: 'civic', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '71', name: 'City', slug: 'city', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '72', name: 'HR-V', slug: 'hr-v', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '73', name: 'Fit', slug: 'fit', brandId: '8', years: [2018, 2019, 2020, 2021] },
  { id: '74', name: 'WR-V', slug: 'wr-v', brandId: '8', years: [2018, 2019, 2020, 2021] },
  { id: '75', name: 'CR-V', slug: 'cr-v', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '76', name: 'Accord', slug: 'accord', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '77', name: 'ZR-V', slug: 'zr-v', brandId: '8', years: [2024, 2025] },
  // Toyota (brandId: 9)
  { id: '80', name: 'Corolla', slug: 'corolla', brandId: '9', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '81', name: 'Corolla Cross', slug: 'corolla-cross', brandId: '9', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '82', name: 'Hilux', slug: 'hilux', brandId: '9', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '83', name: 'Yaris', slug: 'yaris', brandId: '9', years: [2019, 2020, 2021, 2022, 2023] },
  { id: '84', name: 'SW4', slug: 'sw4', brandId: '9', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '85', name: 'RAV4', slug: 'rav4', brandId: '9', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Citroen (brandId: 10)
  { id: '90', name: 'C3', slug: 'c3', brandId: '10', years: [2022, 2023, 2024, 2025] },
  { id: '91', name: 'C4 Cactus', slug: 'c4-cactus', brandId: '10', years: [2019, 2020, 2021, 2022, 2023] },
  { id: '92', name: 'C3 Aircross', slug: 'c3-aircross', brandId: '10', years: [2023, 2024, 2025] },
  // Jeep (brandId: 11)
  { id: '100', name: 'Renegade', slug: 'renegade', brandId: '11', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '101', name: 'Compass', slug: 'compass', brandId: '11', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '102', name: 'Commander', slug: 'commander', brandId: '11', years: [2022, 2023, 2024, 2025] },
  { id: '103', name: 'Wrangler', slug: 'wrangler', brandId: '11', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '104', name: 'Gladiator', slug: 'gladiator', brandId: '11', years: [2021, 2022, 2023, 2024, 2025] },
  // Nissan (brandId: 12)
  { id: '110', name: 'Kicks', slug: 'kicks', brandId: '12', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '111', name: 'Versa', slug: 'versa', brandId: '12', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '112', name: 'Frontier', slug: 'frontier', brandId: '12', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '113', name: 'Sentra', slug: 'sentra', brandId: '12', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Mitsubishi (brandId: 13)
  { id: '120', name: 'L200 Triton', slug: 'l200-triton', brandId: '13', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '121', name: 'Outlander', slug: 'outlander', brandId: '13', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '122', name: 'Eclipse Cross', slug: 'eclipse-cross', brandId: '13', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '123', name: 'Pajero Sport', slug: 'pajero-sport', brandId: '13', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Kia (brandId: 14)
  { id: '130', name: 'Sportage', slug: 'sportage', brandId: '14', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '131', name: 'Sorento', slug: 'sorento', brandId: '14', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '132', name: 'Cerato', slug: 'cerato', brandId: '14', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '133', name: 'Stonic', slug: 'stonic', brandId: '14', years: [2022, 2023, 2024, 2025] },
  // BMW (brandId: 15)
  { id: '140', name: 'Serie 3', slug: 'serie-3', brandId: '15', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '141', name: 'X1', slug: 'x1', brandId: '15', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '142', name: 'X3', slug: 'x3', brandId: '15', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '143', name: 'X5', slug: 'x5', brandId: '15', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '144', name: 'Serie 5', slug: 'serie-5', brandId: '15', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Mercedes-Benz (brandId: 16)
  { id: '150', name: 'Classe A', slug: 'classe-a', brandId: '16', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '151', name: 'Classe C', slug: 'classe-c', brandId: '16', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '152', name: 'GLA', slug: 'gla', brandId: '16', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '153', name: 'GLC', slug: 'glc', brandId: '16', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Audi (brandId: 17)
  { id: '160', name: 'A3', slug: 'a3', brandId: '17', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '161', name: 'Q3', slug: 'q3', brandId: '17', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '162', name: 'Q5', slug: 'q5', brandId: '17', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '163', name: 'A4', slug: 'a4', brandId: '17', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Volvo (brandId: 18)
  { id: '170', name: 'XC40', slug: 'xc40', brandId: '18', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '171', name: 'XC60', slug: 'xc60', brandId: '18', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '172', name: 'XC90', slug: 'xc90', brandId: '18', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Land Rover (brandId: 19)
  { id: '180', name: 'Discovery Sport', slug: 'discovery-sport', brandId: '19', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '181', name: 'Defender', slug: 'defender', brandId: '19', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '182', name: 'Range Rover Evoque', slug: 'range-rover-evoque', brandId: '19', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Caoa Chery (brandId: 20)
  { id: '190', name: 'Tiggo 5X', slug: 'tiggo-5x', brandId: '20', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '191', name: 'Tiggo 7', slug: 'tiggo-7', brandId: '20', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '192', name: 'Tiggo 8', slug: 'tiggo-8', brandId: '20', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '193', name: 'Arrizo 6', slug: 'arrizo-6', brandId: '20', years: [2021, 2022, 2023, 2024, 2025] },
  // BYD (brandId: 21)
  { id: '200', name: 'Dolphin', slug: 'dolphin', brandId: '21', years: [2023, 2024, 2025] },
  { id: '201', name: 'Song Plus', slug: 'song-plus', brandId: '21', years: [2023, 2024, 2025] },
  { id: '202', name: 'Yuan Plus', slug: 'yuan-plus', brandId: '21', years: [2023, 2024, 2025] },
  { id: '203', name: 'Seal', slug: 'seal', brandId: '21', years: [2024, 2025] },
  { id: '204', name: 'Han', slug: 'han', brandId: '21', years: [2023, 2024, 2025] },
  // GWM (brandId: 22)
  { id: '210', name: 'Haval H6', slug: 'haval-h6', brandId: '22', years: [2022, 2023, 2024, 2025] },
  { id: '211', name: 'Ora 03', slug: 'ora-03', brandId: '22', years: [2023, 2024, 2025] },
  { id: '212', name: 'Poer', slug: 'poer', brandId: '22', years: [2023, 2024, 2025] },
  // RAM (brandId: 23)
  { id: '220', name: 'Rampage', slug: 'rampage', brandId: '23', years: [2023, 2024, 2025] },
  { id: '221', name: '1500', slug: '1500', brandId: '23', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '222', name: '2500', slug: '2500', brandId: '23', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Porsche (brandId: 24)
  { id: '230', name: 'Cayenne', slug: 'cayenne', brandId: '24', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '231', name: 'Macan', slug: 'macan', brandId: '24', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '232', name: '911', slug: '911', brandId: '24', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Subaru (brandId: 25)
  { id: '240', name: 'Forester', slug: 'forester', brandId: '25', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '241', name: 'Impreza', slug: 'impreza', brandId: '25', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '242', name: 'XV', slug: 'xv', brandId: '25', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },

  // === MOTOS ===
  // Honda Motos (brandId: 101) - Mais vendidas do Brasil
  { id: '1001', name: 'CG 160 Fan', slug: 'cg-160-fan', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1002', name: 'CG 160 Start', slug: 'cg-160-start', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1003', name: 'CG 160 Titan', slug: 'cg-160-titan', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1004', name: 'Biz 110i', slug: 'biz-110i', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1005', name: 'Biz 125', slug: 'biz-125', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1006', name: 'Pop 110i', slug: 'pop-110i', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1007', name: 'XRE 190', slug: 'xre-190', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1008', name: 'XRE 300', slug: 'xre-300', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1009', name: 'NXR 160 Bros', slug: 'nxr-160-bros', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1010', name: 'CB 250F Twister', slug: 'cb-250f-twister', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1011', name: 'CB 300F Twister', slug: 'cb-300f-twister', brandId: '101', years: [2022, 2023, 2024, 2025] },
  { id: '1012', name: 'CB 500F', slug: 'cb-500f', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1013', name: 'CB 500X', slug: 'cb-500x', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1014', name: 'CB 650R', slug: 'cb-650r', brandId: '101', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1015', name: 'CBR 650R', slug: 'cbr-650r', brandId: '101', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1016', name: 'CBR 1000RR Fireblade', slug: 'cbr-1000rr-fireblade', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1017', name: 'PCX 160', slug: 'pcx-160', brandId: '101', years: [2022, 2023, 2024, 2025] },
  { id: '1018', name: 'Elite 125', slug: 'elite-125', brandId: '101', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1019', name: 'ADV 150', slug: 'adv-150', brandId: '101', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '10191', name: 'SH 150i', slug: 'sh-150i', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10192', name: 'Africa Twin 1100', slug: 'africa-twin-1100', brandId: '101', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10193', name: 'NC 750X', slug: 'nc-750x', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10194', name: 'Gold Wing', slug: 'gold-wing', brandId: '101', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Yamaha (brandId: 102) - Segunda mais vendida
  { id: '1020', name: 'Factor 125', slug: 'factor-125', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1021', name: 'Factor 150', slug: 'factor-150', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1022', name: 'Fazer 150', slug: 'fazer-150', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1023', name: 'Fazer 250', slug: 'fazer-250', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1024', name: 'Crosser 150', slug: 'crosser-150', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1025', name: 'Crosser 250', slug: 'crosser-250', brandId: '102', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1026', name: 'Lander 250', slug: 'lander-250', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1027', name: 'XTZ 150', slug: 'xtz-150', brandId: '102', years: [2018, 2019, 2020, 2021] },
  { id: '1028', name: 'XTZ 250', slug: 'xtz-250', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1029', name: 'Fluo 125', slug: 'fluo-125', brandId: '102', years: [2022, 2023, 2024, 2025] },
  { id: '1030', name: 'Neo 125', slug: 'neo-125', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1031', name: 'NMAX 160', slug: 'nmax-160', brandId: '102', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1032', name: 'XMAX 250', slug: 'xmax-250', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1033', name: 'MT-03', slug: 'mt-03', brandId: '102', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1034', name: 'MT-07', slug: 'mt-07', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1035', name: 'MT-09', slug: 'mt-09', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1036', name: 'YZF-R3', slug: 'yzf-r3', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1037', name: 'YZF-R7', slug: 'yzf-r7', brandId: '102', years: [2022, 2023, 2024, 2025] },
  { id: '1038', name: 'Tenere 250', slug: 'tenere-250', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1039', name: 'Tenere 700', slug: 'tenere-700', brandId: '102', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '10391', name: 'Tracer 900 GT', slug: 'tracer-900-gt', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10392', name: 'Super Tenere 1200', slug: 'super-tenere-1200', brandId: '102', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Suzuki (brandId: 103)
  { id: '1040', name: 'Intruder 125', slug: 'intruder-125', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1041', name: 'GSX-S750', slug: 'gsx-s750', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1042', name: 'GSX-S1000', slug: 'gsx-s1000', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1043', name: 'V-Strom 650', slug: 'v-strom-650', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1044', name: 'V-Strom 1050', slug: 'v-strom-1050', brandId: '103', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1045', name: 'GSX-R 750', slug: 'gsx-r-750', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1046', name: 'GSX-R 1000', slug: 'gsx-r-1000', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1047', name: 'Hayabusa', slug: 'hayabusa', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1048', name: 'Burgman 400', slug: 'burgman-400', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1049', name: 'Boulevard M800', slug: 'boulevard-m800', brandId: '103', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Kawasaki (brandId: 104)
  { id: '1050', name: 'Z400', slug: 'z400', brandId: '104', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1051', name: 'Z650', slug: 'z650', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1052', name: 'Z900', slug: 'z900', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1053', name: 'Z1000', slug: 'z1000', brandId: '104', years: [2018, 2019, 2020, 2021] },
  { id: '1054', name: 'Ninja 300', slug: 'ninja-300', brandId: '104', years: [2018, 2019, 2020, 2021] },
  { id: '1055', name: 'Ninja 400', slug: 'ninja-400', brandId: '104', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1056', name: 'Ninja 650', slug: 'ninja-650', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1057', name: 'Ninja 1000SX', slug: 'ninja-1000sx', brandId: '104', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1058', name: 'Ninja ZX-6R', slug: 'ninja-zx-6r', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1059', name: 'Ninja ZX-10R', slug: 'ninja-zx-10r', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10591', name: 'Versys 650', slug: 'versys-650', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10592', name: 'Versys 1000', slug: 'versys-1000', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10593', name: 'Vulcan S 650', slug: 'vulcan-s-650', brandId: '104', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // BMW Motorrad (brandId: 105)
  { id: '1060', name: 'G 310 R', slug: 'g-310-r', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1061', name: 'G 310 GS', slug: 'g-310-gs', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1062', name: 'F 750 GS', slug: 'f-750-gs', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1063', name: 'F 850 GS', slug: 'f-850-gs', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1064', name: 'F 900 R', slug: 'f-900-r', brandId: '105', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1065', name: 'F 900 XR', slug: 'f-900-xr', brandId: '105', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1066', name: 'R 1250 GS', slug: 'r-1250-gs', brandId: '105', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1067', name: 'R 1250 GS Adventure', slug: 'r-1250-gs-adventure', brandId: '105', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1068', name: 'S 1000 R', slug: 's-1000-r', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1069', name: 'S 1000 RR', slug: 's-1000-rr', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10691', name: 'S 1000 XR', slug: 's-1000-xr', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10692', name: 'R 18', slug: 'r-18', brandId: '105', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '10693', name: 'K 1600 GTL', slug: 'k-1600-gtl', brandId: '105', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Harley-Davidson (brandId: 106)
  { id: '1070', name: 'Iron 883', slug: 'iron-883', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1071', name: 'Forty-Eight', slug: 'forty-eight', brandId: '106', years: [2018, 2019, 2020, 2021, 2022] },
  { id: '1072', name: 'Fat Bob', slug: 'fat-bob', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1073', name: 'Street Bob', slug: 'street-bob', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1074', name: 'Low Rider', slug: 'low-rider', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1075', name: 'Road King', slug: 'road-king', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1076', name: 'Street Glide', slug: 'street-glide', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1077', name: 'Road Glide', slug: 'road-glide', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1078', name: 'Pan America', slug: 'pan-america', brandId: '106', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1079', name: 'Sportster S', slug: 'sportster-s', brandId: '106', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '10791', name: 'Breakout', slug: 'breakout', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10792', name: 'Fat Boy', slug: 'fat-boy', brandId: '106', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Triumph (brandId: 107)
  { id: '1080', name: 'Street Triple 765', slug: 'street-triple-765', brandId: '107', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1081', name: 'Speed Triple 1200', slug: 'speed-triple-1200', brandId: '107', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1082', name: 'Tiger 900', slug: 'tiger-900', brandId: '107', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1083', name: 'Tiger 1200', slug: 'tiger-1200', brandId: '107', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1084', name: 'Bonneville T100', slug: 'bonneville-t100', brandId: '107', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1085', name: 'Bonneville T120', slug: 'bonneville-t120', brandId: '107', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1086', name: 'Street Scrambler', slug: 'street-scrambler', brandId: '107', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1087', name: 'Trident 660', slug: 'trident-660', brandId: '107', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1088', name: 'Rocket 3', slug: 'rocket-3', brandId: '107', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  // Ducati (brandId: 108)
  { id: '1090', name: 'Monster 821', slug: 'monster-821', brandId: '108', years: [2018, 2019, 2020, 2021] },
  { id: '1091', name: 'Monster 937', slug: 'monster-937', brandId: '108', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1092', name: 'Multistrada 950', slug: 'multistrada-950', brandId: '108', years: [2018, 2019, 2020, 2021] },
  { id: '1093', name: 'Multistrada V4', slug: 'multistrada-v4', brandId: '108', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1094', name: 'Panigale V2', slug: 'panigale-v2', brandId: '108', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1095', name: 'Panigale V4', slug: 'panigale-v4', brandId: '108', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1096', name: 'Scrambler Icon', slug: 'scrambler-icon', brandId: '108', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1097', name: 'Streetfighter V4', slug: 'streetfighter-v4', brandId: '108', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1098', name: 'Diavel 1260', slug: 'diavel-1260', brandId: '108', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1099', name: 'Hypermotard 950', slug: 'hypermotard-950', brandId: '108', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Royal Enfield (brandId: 109)
  { id: '1100', name: 'Meteor 350', slug: 'meteor-350', brandId: '109', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1101', name: 'Classic 350', slug: 'classic-350', brandId: '109', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1102', name: 'Himalayan', slug: 'himalayan', brandId: '109', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1103', name: 'Hunter 350', slug: 'hunter-350', brandId: '109', years: [2023, 2024, 2025] },
  { id: '1104', name: 'Interceptor 650', slug: 'interceptor-650', brandId: '109', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1105', name: 'Continental GT 650', slug: 'continental-gt-650', brandId: '109', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1106', name: 'Super Meteor 650', slug: 'super-meteor-650', brandId: '109', years: [2023, 2024, 2025] },
  // Shineray (brandId: 110)
  { id: '1110', name: 'Worker 150', slug: 'worker-150', brandId: '110', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1111', name: 'Jet 125', slug: 'jet-125', brandId: '110', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1112', name: 'Phoenix 50', slug: 'phoenix-50', brandId: '110', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1113', name: 'XY 150-5', slug: 'xy-150-5', brandId: '110', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  // Dafra (brandId: 111)
  { id: '1120', name: 'Apache 200', slug: 'apache-200', brandId: '111', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1121', name: 'NH 190', slug: 'nh-190', brandId: '111', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1122', name: 'Maxsym 400', slug: 'maxsym-400', brandId: '111', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1123', name: 'Citycom S 300i', slug: 'citycom-s-300i', brandId: '111', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  // Haojue (brandId: 112)
  { id: '1130', name: 'DR 160', slug: 'dr-160', brandId: '112', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '1131', name: 'NK 150', slug: 'nk-150', brandId: '112', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1132', name: 'DK 150', slug: 'dk-150', brandId: '112', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '1133', name: 'VR 150', slug: 'vr-150', brandId: '112', years: [2022, 2023, 2024, 2025] },
  { id: '1134', name: 'Chopper Road 150', slug: 'chopper-road-150', brandId: '112', years: [2020, 2021, 2022, 2023, 2024, 2025] },

  // === CAMINHOES ===
  // Mercedes-Benz Caminhoes (brandId: 201)
  { id: '2001', name: 'Accelo 815', slug: 'accelo-815', brandId: '201', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2002', name: 'Accelo 1016', slug: 'accelo-1016', brandId: '201', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2003', name: 'Atego 1419', slug: 'atego-1419', brandId: '201', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2004', name: 'Atego 2430', slug: 'atego-2430', brandId: '201', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2005', name: 'Actros 2651', slug: 'actros-2651', brandId: '201', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2006', name: 'Axor 2544', slug: 'axor-2544', brandId: '201', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Volvo Caminhoes (brandId: 202)
  { id: '2010', name: 'VM 270', slug: 'vm-270', brandId: '202', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2011', name: 'VM 330', slug: 'vm-330', brandId: '202', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2012', name: 'FH 540', slug: 'fh-540', brandId: '202', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2013', name: 'FH 460', slug: 'fh-460', brandId: '202', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2014', name: 'FM 380', slug: 'fm-380', brandId: '202', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Scania (brandId: 203)
  { id: '2020', name: 'R 450', slug: 'r-450', brandId: '203', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2021', name: 'R 540', slug: 'r-540', brandId: '203', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2022', name: 'S 500', slug: 's-500', brandId: '203', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2023', name: 'P 360', slug: 'p-360', brandId: '203', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2024', name: 'G 500', slug: 'g-500', brandId: '203', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Volkswagen Caminhoes (brandId: 204)
  { id: '2030', name: 'Delivery 9.170', slug: 'delivery-9170', brandId: '204', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2031', name: 'Delivery 11.180', slug: 'delivery-11180', brandId: '204', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2032', name: 'Constellation 24.280', slug: 'constellation-24280', brandId: '204', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2033', name: 'Constellation 25.420', slug: 'constellation-25420', brandId: '204', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2034', name: 'e-Delivery', slug: 'e-delivery', brandId: '204', years: [2022, 2023, 2024, 2025] },
  // DAF (brandId: 205)
  { id: '2040', name: 'XF 105', slug: 'xf-105', brandId: '205', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2041', name: 'CF 85', slug: 'cf-85', brandId: '205', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2042', name: 'LF 220', slug: 'lf-220', brandId: '205', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Iveco (brandId: 206)
  { id: '2050', name: 'Daily 35-150', slug: 'daily-35-150', brandId: '206', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2051', name: 'Tector 170E28', slug: 'tector-170e28', brandId: '206', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2052', name: 'Hi-Way 440', slug: 'hi-way-440', brandId: '206', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2053', name: 'S-Way 490', slug: 's-way-490', brandId: '206', years: [2021, 2022, 2023, 2024, 2025] },
  // MAN (brandId: 207)
  { id: '2060', name: 'TGX 29.480', slug: 'tgx-29480', brandId: '207', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2061', name: 'TGS 26.440', slug: 'tgs-26440', brandId: '207', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2062', name: 'TGL 10.190', slug: 'tgl-10190', brandId: '207', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Ford Caminhoes (brandId: 208)
  { id: '2070', name: 'Cargo 816', slug: 'cargo-816', brandId: '208', years: [2018, 2019, 2020, 2021] },
  { id: '2071', name: 'Cargo 1119', slug: 'cargo-1119', brandId: '208', years: [2018, 2019, 2020, 2021] },
  { id: '2072', name: 'Cargo 2429', slug: 'cargo-2429', brandId: '208', years: [2018, 2019, 2020, 2021] },
]

// Generate realistic price history
function generatePriceHistory(basePrice: number): PriceHistoryPoint[] {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const history: PriceHistoryPoint[] = []
  let currentPrice = basePrice * 0.85 // Start 15% lower

  for (let i = 0; i < 12; i++) {
    const change = (Math.random() - 0.45) * 1000 // Random fluctuation
    currentPrice += change
    history.push({
      month: months[i],
      price: Math.round(currentPrice),
      change: Math.round(change),
    })
  }

  return history
}

// Generate mock FIPE prices for different years
export function generateFipePrice(
  model: FipeModel,
  year: number,
  brandName: string
): FipePrice {
  const basePrice = 30000 + Math.random() * 50000
  const ageAdjustment = (2025 - year) * 2000 // Depreciation
  const adjustedPrice = Math.max(basePrice - ageAdjustment, 10000)

  return {
    id: `${model.id}-${year}`,
    modelId: model.id,
    year,
    price: Math.round(adjustedPrice),
    fipeCode: `${year}${model.id}${year % 10}`,
    brand: brandName,
    model: model.name,
    priceHistory: generatePriceHistory(adjustedPrice),
  }
}

// Helper functions to get data
export function getCategories(): FipeCategory[] {
  return FIPE_CATEGORIES
}

export function getBrandsByCategory(categoryId: string): FipeBrand[] {
  return FIPE_BRANDS.filter((brand) => brand.categoryId === categoryId)
}

export function getModelsByBrand(brandId: string): FipeModel[] {
  return FIPE_MODELS.filter((model) => model.brandId === brandId)
}

export function getModelBySlug(slug: string): FipeModel | undefined {
  return FIPE_MODELS.find((model) => model.slug === slug)
}

export function getBrandBySlug(slug: string): FipeBrand | undefined {
  return FIPE_BRANDS.find((brand) => brand.slug === slug)
}

export function getCategoryBySlug(slug: string): FipeCategory | undefined {
  return FIPE_CATEGORIES.find((cat) => cat.slug === slug)
}

// Search function
export function searchModels(query: string, brandId?: string): FipeModel[] {
  let results = FIPE_MODELS.filter(
    (model) =>
      model.name.toLowerCase().includes(query.toLowerCase()) &&
      (!brandId || model.brandId === brandId)
  )
  return results.slice(0, 10)
}

export function searchBrands(query: string, categoryId?: string): FipeBrand[] {
  let results = FIPE_BRANDS.filter(
    (brand) =>
      brand.name.toLowerCase().includes(query.toLowerCase()) &&
      (!categoryId || brand.categoryId === categoryId)
  )
  return results.slice(0, 10)
}
