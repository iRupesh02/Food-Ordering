import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
  page : number;
  pages:number;
  onPageChange : (page : number) => void
}

const PaginationSelector = ({page , pages , onPageChange}: Props) => {
  const pageNumber = []
  //pages = 3;
  // pageNumber = [1,2,3]
  for(let i =1; i<=pages; i++){
    pageNumber.push(i)
  }
  return (
    <Pagination>
        <PaginationContent>
            { page != 1 && <PaginationItem>
                <PaginationPrevious href="#" onClick={() => onPageChange(page -1)}/>
            </PaginationItem>}
            
            {
                pageNumber.map((number) => (
                    <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>{number}</PaginationLink>
                ))
            }
            {   // page =1 , pageNumber = [1,2,3] that means not in last page
                page != pageNumber.length && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1 )}/>
                    </PaginationItem>
                )
            }
        </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector;