const parseEnam = (enam) => {
  const isString = typeof enam === 'string';
  if (!isString) return;

  const isValidContactType = ['work', 'home', 'personal'].includes(enam);

  return isValidContactType ? enam : undefined;
};

// const parseEnam = (enam) => {
//   const isString = typeof enam === 'string';
//   if (!isString) return;

//   const isEnam = (enam) => ['work', 'home', 'personal'].includes(enam);

//   if (isEnam(enam)) return enam;
// };

// const parseNumber = (number) => {
//   const isString = typeof number === 'string';
//   if (!isString) return;

//   const parseNumber = parseInt(number);
//   if (Number.isNaN(parseNumber)) {
//     return;
//   }

//   return parseNumber;
// };

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseEnam(type);
  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
