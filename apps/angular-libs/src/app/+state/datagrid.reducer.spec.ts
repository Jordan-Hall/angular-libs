import { DatagridEntity } from './datagrid.models';
import * as DatagridActions from './datagrid.actions';
import { State, initialState, reducer } from './datagrid.reducer';

describe('Datagrid Reducer', () => {
  const createDatagridEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DatagridEntity);

  beforeEach(() => {});

  describe('valid Datagrid actions', () => {
    it('loadDatagridSuccess should return set the list of known Datagrid', () => {
      const datagrid = [
        createDatagridEntity('PRODUCT-AAA'),
        createDatagridEntity('PRODUCT-zzz'),
      ];
      const action = DatagridActions.loadDatagridSuccess({ datagrid });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
