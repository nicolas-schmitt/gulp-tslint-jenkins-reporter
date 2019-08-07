'use strict'

const chai = require('chai')

const expect = chai.expect

const reporter = require('../src/reporter')

describe('reporter', () => {
  const path = '/home/ubuntu/workspace/src/file.js'
  const winPath = 'c:\\home\\ubuntu\\workspace\\src\\file.js'
  const vinlyShim = { path }
  const winVinlyShim = { path: winPath }

  describe('#getReportedFilePath', () => {
    it("shouldn't rebase the path when options.pathBase is undefined", () => {
      const actual = reporter.getReportedFilePath(reporter.getSettings({}), vinlyShim)
      expect(actual).to.be.equal(vinlyShim.path)
    })

    it("shouldn't rebase the path when options.pathBase is empty", () => {
      const actual = reporter.getReportedFilePath(reporter.getSettings({ pathBase: '' }), vinlyShim)
      expect(actual).to.be.equal(vinlyShim.path)
    })

    it('should rebase the path when options.pathBase is set', () => {
      const actual = reporter.getReportedFilePath(reporter.getSettings({ pathBase: '/workspace' }), vinlyShim)
      expect(actual).to.be.equal('/src/file.js')
    })

    it('should prepend the path when options.pathPrefix is set', () => {
      const actual = reporter.getReportedFilePath(reporter.getSettings({ pathPrefix: '/project' }), vinlyShim)
      expect(actual).to.be.equal(`/project${vinlyShim.path}`)
    })

    it('should prepend and rebase the path when both options are set', () => {
      const actual = reporter.getReportedFilePath(
        reporter.getSettings({
          pathBase: '/workspace',
          pathPrefix: '/project',
        }),
        vinlyShim
      )
      expect(actual).to.be.equal('/project/src/file.js')
    })

    it('should remove meaningless separators (///)', () => {
      let actual = reporter.getReportedFilePath(reporter.getSettings({ pathPrefix: '/project/' }), vinlyShim)
      expect(actual).to.be.equal(`/project${vinlyShim.path}`)

      actual = reporter.getReportedFilePath(reporter.getSettings({ pathPrefix: '/project//' }), vinlyShim)
      expect(actual).to.be.equal(`/project${vinlyShim.path}`)
    })

    it('should handle win path', () => {
      const actual = reporter.getReportedFilePath(reporter.getSettings({ pathBase: '\\workspace' }), winVinlyShim)
      expect(actual).to.be.equal('/src/file.js')
    })

    it('should handle mixed path', () => {
      let actual = reporter.getReportedFilePath(
        reporter.getSettings({
          pathBase: '/workspace',
          pathPrefix: 'project',
        }),
        winVinlyShim
      )
      expect(actual).to.be.equal('project/src/file.js')

      actual = reporter.getReportedFilePath(
        reporter.getSettings({
          pathBase: '\\workspace',
          pathPrefix: 'project',
        }),
        vinlyShim
      )
      expect(actual).to.be.equal('project/src/file.js')
    })
  })
})
