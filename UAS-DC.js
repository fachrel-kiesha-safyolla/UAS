// ==========================================
// 1. CLASS GUITAR  
// ==========================================

class Guitar {
  constructor(serialNumber, price, spec) {
    this.serialNumber = serialNumber;
    this.price = price;
    this.spec = spec;
  }

  getSerialNumber() { return this.serialNumber; }
  getPrice() { return this.price; }
  setPrice(newPrice) { this.price = newPrice; }
  getSpec() { return this.spec; }
}


// ==========================================
// 2. CLASS GUITAR SPEC
// ==========================================

class GuitarSpec {
  constructor(builder, model, type, backWood, topWood) {
    this.builder = builder;
    this.model = model;
    this.type = type;
    this.backWood = backWood;
    this.topWood = topWood;
  }

  getBuilder() { return this.builder; }
  getModel() { return this.model; }
  getType() { return this.type; }
  getBackWood() { return this.backWood; }
  getTopWood() { return this.topWood; }

  matches(otherSpec) {
    if (otherSpec.getBuilder() !== this.builder) return false;
    if (otherSpec.getModel() !== this.model) return false;
    if (otherSpec.getType() !== this.type) return false;
    if (otherSpec.getBackWood() !== this.backWood) return false;
    if (otherSpec.getTopWood() !== this.topWood) return false;
    return true;
  }
}

// ==========================================
// 3. CLASS INVENTORY 
// ==========================================
class Inventory {
  constructor() {
    this.guitars = [];
  }

  addGuitar(serialNumber, price, builder, model, type, backWood, topWood) {
    const newSpec = new GuitarSpec(builder, model, type, backWood, topWood);
    const newGuitar = new Guitar(serialNumber, price, newSpec);
    this.guitars.push(newGuitar);
  }

  getGuitar(serialNumber) {
    return this.guitars.find(guitar => guitar.getSerialNumber() === serialNumber);
  }

  search(searchSpec) {
    return this.guitars.find(guitar => {
      return guitar.getSpec().matches(searchSpec);
    });
  }
}

// ==========================================
// 4. MAIN PROGRAM (SIMULASI DI TERMINAL)
// ==========================================
console.log("--- MEMULAI APLIKASI TOKO GITAR ---");

const inventory = new Inventory();

inventory.addGuitar("V95693", 1499.95, "Fender", "Stratocaster", "electric", "Alder", "Alder");
inventory.addGuitar("V95123", 1549.95, "Fender", "Stratocaster", "electric", "Alder", "Alder");
inventory.addGuitar("G3425", 2100.00, "Gibson", "Les Paul", "electric", "Mahogany", "Maple");

console.log(`Info: Saat ini ada ${inventory.guitars.length} gitar di gudang.`);
console.log("\n--- Pelanggan (Erin) Datang ---");
console.log("Erin mencari: Fender Stratocaster Electric (Alder/Alder)");

const whatErinLikes = new GuitarSpec("Fender", "Stratocaster", "electric", "Alder", "Alder");

const guitarFound = inventory.search(whatErinLikes);

if (guitarFound) {
  const spec = guitarFound.getSpec();
  
  console.log("-----------------------------------------");
  console.log("DITEMUKAN Erin, mungkin kamu suka ini:");
  console.log("-----------------------------------------");
  console.log(`Serial Number : ${guitarFound.getSerialNumber()}`);
  console.log(`Harga         : $${guitarFound.getPrice()}`); // Otomatis float
  console.log(`Builder       : ${spec.getBuilder()}`);
  console.log(`Model         : ${spec.getModel()}`);
  console.log(`Type          : ${spec.getType()}`);
  console.log(`Back Wood     : ${spec.getBackWood()}`);
  console.log(`Top Wood      : ${spec.getTopWood()}`);
  console.log("-----------------------------------------");
} else {
  console.log("Maaf Erin, kami tidak punya stok yang cocok.");
}