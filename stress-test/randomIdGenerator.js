export default (table = 'products') => {
  let max = (table === 'products') ? 1000011 : 5774952;
  let min = Math.floor(max * 0.1);
  return Math.floor(Math.random() * (max - min) + min);
};