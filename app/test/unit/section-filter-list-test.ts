import { match } from '../../src/lib/fuzzy-find'
import { BranchType } from '../../src/models/branch'
import { IFilterListItem } from '../../src/ui/lib/filter-list'
import { getText } from '../../src/ui/lib/section-filter-list'
describe('fuzzy find', () => {
  const items: Array<IFilterListItem> = [
  {
    id: '300',
    text: ['add fix for ...', 'opened 5 days ago by bob'],
    branch: {
      tip: {
        sha: '',
        author: {
        name: 'bob',
        email: 'bob@bob.com',
        date: new Date('2024-01-01T00:00:00.000Z'),
        tzOffset: 7
      }
    },
    type: BranchType.Local,
    name: 'add fix for',
    ref: '',
    upstream: ''
    }
  },
  {
    id: '500',
    text: ['add support', '#4653 opened 3 days ago by damaneice '],
    branch: {
      tip: {
        sha: '',
        author: {
          name: 'damaneice',
          email: 'damaneice@damaneice.com',
          date: new Date('2024-01-01T00:00:00.000Z'),
          tzOffset: 7
        }
      },
      type: BranchType.Local,
      name: 'add support',
      ref: '',
      upstream: ''
    }
  },
  {
    id: '500',
    text: ['add an awesome feature', '#7564 opened 10 days ago by ... '],
    branch: {
      tip: {
        sha: '',
        author: {
          name: '',
          email: '',
          date: new Date('2024-01-01T00:00:00.000Z'),
          tzOffset: 7
        }
      },
      type: BranchType.Local,
      name: 'add an awesome feature',
      ref: '',
      upstream: ''
    }
  }
]

  it('should find matching item when filtering by branch author', () => {
    const func = (item: IFilterListItem, query: string) => getText(item, query)
    const results = match('@damaneice', items, func)

    expect(results).toHaveLength(1)
    expect(results[0].item.branch?.tip.author.name).toContain('damaneice')
  })
})