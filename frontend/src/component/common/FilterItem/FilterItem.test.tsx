import { screen } from '@testing-library/react';
import { render } from 'utils/testRenderer';
import { FilterItem, IFilterItemProps } from './FilterItem';

const getOption = (option: string) =>
    screen.getByText(option).closest('li')!.querySelector('input')!;

const setup = (initialState: FilterItem) => {
    const recordedChanges: FilterItem[] = [];
    const mockProps: IFilterItemProps = {
        label: 'Test Label',
        options: [
            {
                label: 'Option 1',
                value: '1',
            },
            {
                label: 'Option 2',
                value: '2',
            },
            {
                label: 'Option 3',
                value: '3',
            },
        ],
        onChange: (value: FilterItem) => {
            recordedChanges.push(value);
        },
        onChipClose: () => {},
        singularOperators: ['IS', 'IS_NOT'],
        pluralOperators: ['IS_ANY_OF', 'IS_NONE_OF'],
        state: initialState,
    };

    render(<FilterItem {...mockProps} />);

    return recordedChanges;
};

describe('FilterItem Component', () => {
    it('renders initial state correctly', async () => {
        const mockState = {
            operator: 'IS_ANY_OF',
            values: ['1', '3'],
        };

        const recordedChanges = setup(mockState);

        const valuesElement = await screen.findByText('1, 3');
        await screen.findByText('is any of');
        expect(valuesElement).toBeInTheDocument();

        valuesElement.click();
        await screen.findByPlaceholderText('Search');

        expect(getOption('Option 1').checked).toBe(true);
        expect(getOption('Option 2').checked).toBe(false);
        expect(getOption('Option 3').checked).toBe(true);

        getOption('Option 2').click();

        expect(recordedChanges).toEqual([
            {
                operator: 'IS_ANY_OF',
                values: ['1', '3', '2'],
            },
        ]);
    });

    it('adjusts operator to match singular item', async () => {
        const mockState = {
            operator: 'IS_ANY_OF',
            values: ['1'],
        };

        const recordedChanges = setup(mockState);

        expect(recordedChanges).toEqual([
            {
                operator: 'IS',
                values: ['1'],
            },
        ]);
    });

    it('adjusts operator to match plural items', async () => {
        const mockState = {
            operator: 'IS',
            values: ['1', '2'],
        };

        const recordedChanges = setup(mockState);

        expect(recordedChanges).toEqual([
            {
                operator: 'IS_ANY_OF',
                values: ['1', '2'],
            },
        ]);
    });

    it('switches operator', async () => {
        const mockState = {
            operator: 'IS_ANY_OF',
            values: ['1', '3'],
        };

        const recordedChanges = setup(mockState);

        const operatorsElement = await screen.findByText('is any of');

        operatorsElement.click();
        const newOperator = await screen.findByText('is none of');

        newOperator.click();

        expect(recordedChanges).toEqual([
            {
                operator: 'IS_NONE_OF',
                values: ['1', '3'],
            },
        ]);
    });

    it('deletes all values', async () => {
        const mockState = {
            operator: 'IS_ANY_OF',
            values: ['1', '3'],
        };

        const recordedChanges = setup(mockState);

        const deleteElement = await screen.findByLabelText('delete');

        deleteElement.click();

        expect(recordedChanges).toEqual([
            {
                operator: 'IS',
                values: [],
            },
        ]);
    });
});
