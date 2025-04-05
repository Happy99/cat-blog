// use this to understand if functionality is called on backend or frontend
export const envHelper = (): void => {
  console.log('_____ ENV TEST', process.env.NEXT_PUBLIC_TEST_CLIENT)
  console.log('_____ ENV TEST', process.env.TEST_DEV)
}
