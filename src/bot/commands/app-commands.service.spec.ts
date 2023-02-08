import { Test, type TestingModule } from '@nestjs/testing'
import { AppCommandsService } from './app-commands.service'

describe('AppCommands', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [AppCommandsService]
    }).compile()
  })
  describe('onPing', () => {
    it('should pass', () => {
      expect(true).toBe(true)
    })
  })
})
