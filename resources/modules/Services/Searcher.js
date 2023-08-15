import Const from "../../consts/const.js";

class Searcher {
  constructor() {}

  searchByField(text, field, array) {
    text = text.toLowerCase();

    let searchResult = [];

    searchResult = array.map((item) =>
      this.editForSearch(item[field]).includes(text) ? item : ``,
    );

    return searchResult.filter((item) => item != ``);
  }

  runSearch(text, array) {
    let fields = array.length ? this.getFields(array[0]) : [];

    fields = this.withoutFields(
      true,
      fields,
      Const.postModel.id,
      Const.postModel.body,
    );

    let searchPack = fields.length
      ? fields
          .map((item, idx, arr) => this.searchByField(text, item, array))
          .flat()
      : [];

    return searchPack.length
      ? this.getSortedResult(this.getUnique(searchPack))
      : [];
  }

  editForSearch(field) {
    return String(field).toLowerCase();
  }

  getFields(structure) {
    const fields = Object.keys(structure);

    return typeof structure === "string" ? [] : fields.length ? fields : [];
  }

  getUnique(array) {
    return array.reduce((start, curr) => {
      if (!start.find((item) => item.id == curr.id)) {
        start.push(curr);
      }
      return start;
    }, []);
  }

  getSortedResult(array) {
    return array.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  withoutFields(flag, fields, ...field) {
    if (flag) {
      let set = new Set(field);
      const size = set.size;
      fields.forEach((field) => set.add(field));
      return Array.from(set).slice(size);
    }

    return fields;
  }
}

export default Searcher;
