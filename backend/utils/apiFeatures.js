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

    // Filter for price range
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    console.dir(queryString, "query");

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
}

export default APIFeatures;
