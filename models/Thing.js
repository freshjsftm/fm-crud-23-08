class Thing {
  static client = null;
  static tableName = "things";

  static attributes = {
    body:'string'
  }

  static async create(values){
    const insertAttrs = Object.entries(this.attributes)
      .filter(([attr, domain])=>attr in values)
      .map(([attr])=>attr);
    const insertAttrsString = insertAttrs.map((attr)=>`"${attr}"`).join(',');  
    const insertValuesString = insertAttrs
      .map((attr)=>{
        const value = values[attr];
        return typeof value === 'string' ? `'${value}'` : value;
      }).join(','); 
      const {rows} = await this.client.query(`
        INSERT INTO ${this.tableName}(${insertAttrsString}) 
        VALUES(${insertValuesString}) RETURNING *;`);
      return rows;
  }

  // static async create(values){
  //   const {rows} = await this.client.query(`INSERT INTO ${this.tableName}("body") VALUES('${values.body}') RETURNING *;`);
  //   return rows;    
  // }

  static async findAll(){
    const {rows} = await this.client.query(`SELECT * FROM ${this.tableName};`);
    return rows;
  }
  static async findByPk(pkValue){
    const {rows} = await this.client.query(`SELECT * FROM ${this.tableName} WHERE "id"=${pkValue};`);
    return rows;
  }
  static async updateByPk(pkValue){}
  
  static async deleteByPk(pkValue){
    const {rows} = await this.client.query(`DELETE FROM ${this.tableName} WHERE "id"=${pkValue} RETURNING *;`);
    return rows;
  }

}

module.exports = Thing;
