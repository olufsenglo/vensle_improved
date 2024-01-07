import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";

const Marketplace = () => {
  return (
    <div>
      <div className="mt-5 grid h-full">
        <HistoryCard />
      </div>
      <div className="mt-5 grid h-full">
          <TopCreatorTable
            extra="mb-5"
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          />
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="ETH AI Brain"
              author="Nick Wilson"
              price="0.7"
              image={NFt2}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="ETH AI Brain"
              author="Nick Wilson"
              price="0.7"
              image={NFt2}
            />
      </div>


    </div>
  );
};

export default Marketplace;
