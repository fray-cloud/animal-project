import { AnimalInfo } from 'front/new-types/responseAPI';
import React from 'react';

type Props = {
  item: AnimalInfo;
};

export const AnimalCard = (props: Props) => {
  const { item } = props;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={item.popfile} alt="pet" className="rounded-xl h-32" />
      </figure>
      <div className="card-body items-center text-center">
        <table className="table table-sm">
          <thead></thead>
          <tbody>
            <tr className="hover">
              <th>종류</th>
              <td>{item.kindCd}</td>
            </tr>
            <tr className="hover">
              <th>성별</th>
              <td>{item.sexCd}</td>
            </tr>
            <tr className="hover">
              <th>나이</th>
              <td>{item.age}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
