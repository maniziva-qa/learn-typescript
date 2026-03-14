test("Inventory - Add, Delete, Get", () => {
  class InventoryList {
    private item: string[] = [];

    constructor(){
      console.log('Class is initialized');
    }
    addList(name: string): any {
      if (!this.item.includes(name)) {
        this.item.push(name);
      }
    }

    removeList(name: string): any {
      this.item = this.item.filter((item) => item !== name);
    }

    getList() {
      console.log([...this.item]);
    }
  }

  const inventory = new InventoryList();
  
  inventory.addList("Manikandan");
  inventory.addList("Adaikalam");
  inventory.getList();
  inventory.removeList("Adaikalam");
  inventory.getList();
});
