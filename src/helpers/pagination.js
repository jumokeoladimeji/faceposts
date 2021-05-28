/**
 * @description - Creates pagination data
 * limit - page size
 * offset - number of rows to be omitted before the beginning of the result set
*/
export const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};


export const getPagingData = (returnedData, page, limit) => {
    const { count: totalItems, rows: data } = returnedData;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, data, totalPages, currentPage };
};