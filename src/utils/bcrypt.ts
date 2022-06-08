import bc from 'bcrypt'
const salt = 8

const encodePassword = async (password) => {
  
  const encoded = await bc.hash(password, salt);
  return encoded;
}

const checkPassword = async (encodedPassword, password) => {
  const checked = await bc.compare(password, encodedPassword);
  return checked
}

export {
  encodePassword,
  checkPassword
}