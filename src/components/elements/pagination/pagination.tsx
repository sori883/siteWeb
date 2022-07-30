import React from 'react';
import ReactPaginate from 'react-paginate';

export type PaginationProps = {
  page: number;
  total: number;
  onChange: (selectedItem: { selected: number; }) => void;
};

export const Pagination = ({
  page,
  total,
  onChange,
}: PaginationProps): JSX.Element  => (
  <>
    <ReactPaginate
      forcePage={page - 1} // 現在のページをreactのstateで管理したい場合等
      pageCount={total}
      onPageChange={onChange}
      marginPagesDisplayed={4} // 先頭と末尾に表示するページ数
      pageRangeDisplayed={2} // 現在のページの前後をいくつ表示させるか
      containerClassName='btn-group' // ul(pagination本体)
      pageClassName='btn px-0' // li
      pageLinkClassName='flex items-center w-full h-full px-3' // a
      activeClassName=' btn-active' // active.li
      activeLinkClassName='active' // active.li < a
      
      // 戻る・進む関連
      previousClassName='btn' // li
      nextClassName='btn' // li
      previousLabel={'<'} // a
      previousLinkClassName='previous-link'
      nextLabel={'>'} // a
      nextLinkClassName='next-link'
    
      // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
      disabledClassName='disabled-button d-none'
    
      // 中間ページの省略表記関連
      breakLabel='...'
      breakClassName='btn'
      breakLinkClassName='page-link'
    />
  </>
);