import React, { useState } from 'react';

const structures = [
  {
    name: "Free Group F(a,b)",
    type: "Group",
    abelian: "No",
    finite: "No",
    ordered: "No",
    zeroDiv: "N/A",
    unique: "Yes",
    generators: "2",
    relations: "None",
    examples: "Words in a, b, a^(-1), b^(-1)",
    summary: "The 'freest' group with two generators. Has no relations other than group axioms. Infinite and non-abelian. Essential in abstract algebra and theoretical physics."
  },
  {
    name: "Integers (Z, +)",
    type: "Group, Ring",
    abelian: "Yes",
    finite: "No",
    ordered: "Yes",
    zeroDiv: "No",
    unique: "Yes",
    generators: "1",
    relations: "Commutativity",
    examples: "..., -1, 0, 1, 2, ...",
    summary: "Fundamental number system. Infinite, ordered, and abelian. Forms a ring under addition and multiplication. Crucial in number theory and algebra."
  },
  {
    name: "Rational Numbers (Q, +, ×)",
    type: "Field",
    abelian: "Yes",
    finite: "No",
    ordered: "Yes",
    zeroDiv: "No",
    unique: "No",
    generators: "∞",
    relations: "Field axioms",
    examples: "1/2, -3/4, 2, ...",
    summary: "Smallest ordered field containing integers. Dense in real numbers. Essential in analysis and algebra. Allows division by non-zero elements."
  },
  {
    name: "Symmetric Group S_3",
    type: "Group",
    abelian: "No",
    finite: "Yes",
    ordered: "No",
    zeroDiv: "N/A",
    unique: "No",
    generators: "2",
    relations: "Several",
    examples: "(1 2), (1 2 3)",
    summary: "Smallest non-abelian group. Contains all permutations of 3 objects. Important in group theory and combinatorics. Illustrates concepts of symmetry."
  },
  {
    name: "Polynomial Ring R[x]",
    type: "Ring",
    abelian: "Yes",
    finite: "No",
    ordered: "No",
    zeroDiv: "Yes",
    unique: "Yes",
    generators: "∞",
    relations: "Commutativity",
    examples: "x^2 + 2x + 1",
    summary: "Ring of polynomials with real coefficients. Infinite-dimensional vector space. Fundamental in algebra and analysis. Used in polynomial interpolation and algebraic geometry."
  },
  {
    name: "Quaternions H",
    type: "Division Ring",
    abelian: "No",
    finite: "No",
    ordered: "No",
    zeroDiv: "No",
    unique: "Yes",
    generators: "4",
    relations: "i^2 = j^2 = k^2 = ijk = -1",
    examples: "1 + 2i - j + 3k",
    summary: "4D extension of complex numbers. Non-commutative division ring. Used in 3D rotations, computer graphics, and quantum mechanics. Discovered by Hamilton."
  },
  {
    name: "Z × Z",
    type: "Abelian Group",
    abelian: "Yes",
    finite: "No",
    ordered: "Partially",
    zeroDiv: "N/A",
    unique: "Yes",
    generators: "2",
    relations: "Commutativity",
    examples: "(3, -2), (0, 1)",
    summary: "Direct product of integers with itself. Forms a lattice in 2D plane. Important in algebraic topology and number theory. Generalizes to n-dimensional integer lattices."
  },
  {
    name: "Matrix Ring M_n(R)",
    type: "Ring",
    abelian: "No (n>1)",
    finite: "No",
    ordered: "No",
    zeroDiv: "Yes (n>1)",
    unique: "Yes",
    generators: "n^2",
    relations: "Matrix multiplication",
    examples: "[[1,2],[3,4]]",
    summary: "Ring of n×n matrices over real numbers. Non-commutative for n>1. Essential in linear algebra, group representation theory, and differential equations."
  }
];

const typeDefinitions = {
  "Group": "A set with an associative binary operation, identity element, and inverses for all elements. Example: The integers under addition.",
  "Ring": "A set with two binary operations (usually called addition and multiplication) satisfying certain axioms. Example: The integers under addition and multiplication.",
  "Field": "A ring where all non-zero elements have multiplicative inverses. Example: The rational numbers under addition and multiplication.",
  "Division Ring": "A ring where all non-zero elements have multiplicative inverses, but multiplication may not be commutative. Example: The quaternions.",
  "Abelian Group": "A group where the binary operation is commutative. Example: The integers under addition."
};

const columnDefinitions = {
  "abelian": "A structure is abelian if its operation(s) are commutative, i.e., a * b = b * a for all elements a and b.",
  "finite": "A structure is finite if it contains a finite number of elements.",
  "ordered": "A structure is ordered if there's a consistent way to say one element is 'less than' another.",
  "zeroDiv": "Zero divisors are non-zero elements that, when multiplied by another non-zero element, result in zero.",
  "unique": "Refers to whether elements have a unique representation in the structure.",
  "generators": "A set of elements that can produce all other elements in the structure through the structure's operations.",
  "relations": "Equations that hold between elements of the structure, often defining the structure's properties."
};

const relationDefinitions = {
  "None": "No additional relations beyond the basic axioms of the structure.",
  "Commutativity": "For all elements a and b, a * b = b * a.",
  "Field axioms": "Includes commutativity, associativity, distributivity, and existence of additive and multiplicative inverses (except for 0).",
  "Several": "Multiple relations defining the structure's specific properties.",
  "i^2 = j^2 = k^2 = ijk = -1": "Fundamental relations defining the quaternion algebra.",
  "Matrix multiplication": "Rules for multiplying matrices, including non-commutativity for matrices larger than 1x1."
};

const AlgebraicStructuresApp = () => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [hoveredStructure, setHoveredStructure] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [hoveredRelation, setHoveredRelation] = useState(null);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedStructures = [...structures].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="max-w-full p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Algebraic Structures Comparison</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-600 text-white">
              {Object.keys(structures[0]).filter(key => key !== 'summary').map((key) => (
                <th 
                  key={key} 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => handleSort(key)}
                  onMouseEnter={() => setHoveredColumn(key)}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortColumn === key && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStructures.map((structure, index) => (
              <tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-150`}
              >
                {Object.entries(structure).filter(([key]) => key !== 'summary').map(([key, value], valueIndex) => (
                  <td 
                    key={valueIndex} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    onMouseEnter={() => {
                      if (key === 'name') setHoveredStructure(structure);
                      if (key === 'type') setHoveredType(value);
                      if (key === 'relations') setHoveredRelation(value);
                    }}
                    onMouseLeave={() => {
                      if (key === 'name') setHoveredStructure(null);
                      if (key === 'type') setHoveredType(null);
                      if (key === 'relations') setHoveredRelation(null);
                    }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(hoveredStructure || hoveredType || hoveredColumn || hoveredRelation) && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500">
          {hoveredStructure && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Summary: {hoveredStructure.name}</h3>
              <p className="text-gray-700">{hoveredStructure.summary}</p>
            </div>
          )}
          {hoveredType && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Definition: {hoveredType}</h3>
              <p className="text-gray-700">{typeDefinitions[hoveredType.split(',')[0].trim()]}</p>
            </div>
          )}
          {hoveredColumn && columnDefinitions[hoveredColumn] && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Column Definition: {hoveredColumn}</h3>
              <p className="text-gray-700">{columnDefinitions[hoveredColumn]}</p>
            </div>
          )}
          {hoveredRelation && relationDefinitions[hoveredRelation] && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Relation Definition: {hoveredRelation}</h3>
              <p className="text-gray-700">{relationDefinitions[hoveredRelation]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlgebraicStructuresApp;
