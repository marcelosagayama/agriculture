export const isValidCpf = (cpfValue: string | string[]) => {
  if (!cpfValue) return false

  const formatToString = (val: string | string[]) => {
    if (Array.isArray(val)) return val.join('')
    if (typeof val === 'string') return val
    return null
  }

  const cpfString = formatToString(cpfValue)

  if (!cpfString) return false

  let cpf = cpfString.replace(/[^\d]+/g, '')

  // Validates length
  if (cpf.length !== 11) return false

  // Clear invalids
  if (/^(\d)\1+$/.test(cpf)) return false

  let sum = 0
  let remain: number

  for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  remain = (sum * 10) % 11

  if (remain === 10 || remain === 11) remain = 0
  if (remain !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  remain = (sum * 10) % 11

  if (remain === 10 || remain === 11) remain = 0
  if (remain !== parseInt(cpf.substring(10, 11))) return false

  return true
}

export const isValidCnpj = (cnpjValue) => {
  if (!cnpjValue) return false

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const validTypes =
    typeof cnpjValue === 'string' || Number.isInteger(cnpjValue) || Array.isArray(cnpjValue)

  // Elimina valor não em formato inválido
  if (!validTypes) return false

  // Guarda um array com todos os dígitos do valor
  const numbers = cnpjValue.toString().match(/\d/g).map(Number)

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false

  // Elimina inválidos com todos os dígitos iguais
  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  // Cálculo validador
  const calc = (x) => {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12)

  // Valida 1o. dígito verificador
  const digit0 = calc(12)
  if (digit0 !== digits[0]) return false

  // Valida 2o. dígito verificador
  const digit1 = calc(13)
  return digit1 === digits[1]
}
