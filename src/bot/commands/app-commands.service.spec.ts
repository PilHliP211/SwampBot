import { Test, TestingModule } from '@nestjs/testing';
import { AppCommands } from './app-commands.service';

describe('AppCommands', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [AppCommands],
        }).compile();
    });
    describe('onPing', () => {
        it('should pass', () => {
            expect(true).toBe(true);
        })
    })

});
