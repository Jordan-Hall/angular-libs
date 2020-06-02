import { DatagridEntity } from './datagrid.models';
import { State, datagridAdapter, initialState } from './datagrid.reducer';
import * as DatagridSelectors from './datagrid.selectors';

describe('Datagrid Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDatagridId = (it) => it['id'];
  const createDatagridEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DatagridEntity);

  let state;

  beforeEach(() => {
    state = {
      datagrid: datagridAdapter.addAll(
        [
          createDatagridEntity('PRODUCT-AAA'),
          createDatagridEntity('PRODUCT-BBB'),
          createDatagridEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Datagrid Selectors', () => {
    it('getAllDatagrid() should return the list of Datagrid', () => {
      const results = DatagridSelectors.getAllDatagrid(state);
      const selId = getDatagridId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DatagridSelectors.getSelected(state);
      const selId = getDatagridId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDatagridLoaded() should return the current 'loaded' status", () => {
      const result = DatagridSelectors.getDatagridLoaded(state);

      expect(result).toBe(true);
    });

    it("getDatagridError() should return the current 'error' state", () => {
      const result = DatagridSelectors.getDatagridError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
