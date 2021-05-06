
import { waitForDomChange } from '@testing-library/dom';
import { create ,act } from 'react-test-renderer';
import { Ejemplo } from './Ejemplo';

let component

describe('<Ejemplo/>', ()=> {
    beforeEach(()=> {
        jest.useFakeTimers();
        window.fetch = jest.fn().mockImplementation(()=> Promise.resolve({
            json: ()=> Promise.resolve([])
        }));

        window.Storage.prototype.setItem = jest.fn();
        component = create(<Ejemplo/>);
    });


    it('Ejemplo renderiza a full', ()=> {
        expect(component.root).toBeDefined();
        expect(component.root.findByType('h4')).toBeDefined();
    });

    it('llama a la API con Fetch', async ()=> {
        expect(window.fetch).not.toHaveBeenCalled();

        await act(async ()=> {
            await jest.runAllTimers();
        })
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(component.root.findAllByType('p').length).toEqual(0);

        window.fetch = jest.fn().mockImplementation(()=> Promise.resolve({
            json: ()=> Promise.resolve([{id:'test10ne',name:'israel',username:'bugintheconsole'}])
        }))

        await component.update(<Ejemplo/>);
        await act(async ()=> {
            await jest.runAllTimers();
        })
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(component.root.findAllByType('p').length).toEqual(1);
    });

    it('Guarda el resultado en localStorage', async()=> {
        await act(async ()=> {
            await jest.runAllTimers();
        });

        expect(localStorage.setItem).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledWith('users',"[]");
    });

    afterAll(()=> {
        window.fetch.mockReset();
        window.Storage.prototype.setItem.mockReset();
    });
});