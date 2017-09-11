import packageJson from '../package.json'

describe('package.json', () => {
  it('Проверка снепшота package.json', () => {
    expect(packageJson).toMatchSnapshot()
  })
})
