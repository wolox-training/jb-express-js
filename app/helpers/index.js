const config = require('../../config/').common;

exports.getPagination = (page, size) => {
  const limit = Number(size) || config.database.limit;
  const offset = page ? (page - 1) * limit : config.database.offset;
  return { limit, offset };
};

exports.getPaginData = (data, pageNumber, limit, offset) => {
  const { count: total_count, rows: page } = data;
  const count = page.length;
  const current_page = pageNumber ? Number(pageNumber) : 1;
  let previous_page = current_page - 1;
  if (previous_page < 1) previous_page = null;
  const next_page = current_page + 1;
  const total_pages = Math.ceil(total_count / limit);
  return { page, count, limit, offset, total_pages, total_count, previous_page, current_page, next_page };
};
