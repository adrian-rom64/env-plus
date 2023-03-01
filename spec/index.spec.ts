describe('Index', () => {
  it('should export important entities', async () => {
    const index = await import('../src/index')

    expect(index.EnvSchema).toBeDefined()
    expect(index.EnvProperty).toBeDefined()
    expect(index.EnvNested).toBeDefined()
    expect(index.EnvManager).toBeDefined()
  })
})
