const Limit = {
  windowMs: 15 * 60 * 1000,
  limit: 10,
};
const Cors = {
  origin: process.env.BASE_URL,
  methods: ["GET", "POST", "PUT"],
};

export { Cors, Limit };
