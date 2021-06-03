
exports.getPaginationSettings = function(page, size){
    const limit = parseInt(size);
    const offset = limit * (parseInt(page) - 1)
    return {limit, offset}
}

exports.getPagingData = function(dataRows, page, limit, type) {
    var { rows: data } = dataRows;
    const currentPage = page ? +page : 0;
    var totalItems = dataRows.count || 0
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, currentPage };
};