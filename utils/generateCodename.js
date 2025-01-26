const codenames = [
    'Nightingale', 'Kraken', 'Phantom', 'Viper', 'Falcon', 
    'Raven', 'Jaguar', 'Cobra', 'Titan', 'Falconer'
  ];
  
const generateRandomCodename = () => {
  const randomIndex = Math.floor(Math.random() * codenames.length);
  const codename = codenames[randomIndex];
  
  return codename;
};
  
module.exports = generateRandomCodename;
  