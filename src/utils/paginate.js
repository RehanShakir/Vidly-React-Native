import _ from "lodash";

export function paginate(allMovies, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return _(allMovies).slice(startIndex).take(pageSize).value();
}

/* return _(allMovies): take all the movies
         .slice(startIndex): slice the array from (stratIndex+1) upto
         .take(pageSize): slice upto the pageSize and
         .vale(): takes all the values of the array after sliced
*/
