import packageJson from '../../package.json'

describe('Целостность package.json', () => {
  it('Проверка снепшота package.json', () => {
    expect(packageJson).toMatchSnapshot()
  })
})
