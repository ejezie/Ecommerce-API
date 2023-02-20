class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    // Removing unwanted properties
    const removeKeys = ["keyword", "page", "limit"];
    removeKeys.forEach((key) => delete queryCopy[key]);

    console.dir(queryCopy, "query");

    this.query = this.query.find(queryCopy);
    return this;
  }
}

export default APIFeatures;
