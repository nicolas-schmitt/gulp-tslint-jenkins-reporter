'use strict'

const chai = require('chai')

const expect = chai.expect
chai.use(require('chai-spies'))
chai.use(require('chai-string'))
chai.use(require('chai-xml'))

const Formatter = require('../src/formatter')
const inputMock = require('./mocks/input')
const outputMock = require('./mocks/output')

describe('formatter', () => {
  describe('#formatError', () => {
    it('should return a valid xml', () => {
      Object.keys(inputMock).forEach(name => {
        const input = inputMock[name]
        input.tslint.failures.forEach(failure => {
          const formatter = new Formatter()
          const actualXml = formatter.formatError(failure)
          expect(actualXml).xml.to.be.valid()
        })
      })
    })

    it('should return the xml corresponding to the failure', () => {
      Object.keys(inputMock).forEach(name => {
        const input = inputMock[name]
        input.tslint.failures.forEach((failure, i) => {
          const formatter = new Formatter()
          const actualXml = formatter.formatError(failure)
          expect(actualXml).to.be.equal(outputMock[name].failures[i])
        })
      })
    })
  })

  describe('#formatFile', () => {
    it('should return a valid xml', () => {
      Object.keys(inputMock).forEach(name => {
        const input = inputMock[name]
        const formatter = new Formatter()
        const actualXml = formatter.formatFile(input.basename, input.tslint.failures)
        expect(actualXml).xml.to.be.valid()
      })
    })

    it('should return an empty file element when there is no failure', () => {
      const formatter = new Formatter()
      expect(formatter.formatFile(inputMock.clean.basename, inputMock.clean.tslint.failures)).to.equal(
        outputMock.clean.file
      )
    })

    Object.keys(inputMock).forEach(name => {
      const input = inputMock[name]
      const failureCount = input.tslint.failures.length

      it(`should call #formatError ${failureCount} time(s) for ${name}`, () => {
        const formatter = new Formatter()
        const spy = chai.spy.on(formatter, 'formatError')
        formatter.formatFile(input.basename, input.tslint.failures)
        expect(spy).to.have.been.called.exactly(failureCount)
      })
    })

    it('should return a file element with as many children as failure', () => {
      Object.keys(inputMock).forEach(name => {
        const input = inputMock[name]
        const formatter = new Formatter()
        const failureCount = input.tslint.failures.length
        const actualXml = formatter.formatFile(input.basename, input.tslint.failures)
        expect(actualXml).to.have.entriesCount('<error', failureCount)
      })
    })
  })

  describe('#formatStream', () => {
    it('should return a valid xml', () => {
      const formatter = new Formatter()
      const files = Object.keys(outputMock).map(mockName => {
        const mock = outputMock[mockName]

        return {
          path: mock.path,
          xml: mock.file,
        }
      })

      const actualXml = formatter.formatStream(files)
      expect(actualXml).xml.to.be.valid()
    })

    it('should return a checkstyle element with as many children as file', () => {
      const formatter = new Formatter()
      const files = Object.keys(outputMock).map(mockName => {
        const mock = outputMock[mockName]

        return {
          path: mock.path,
          xml: mock.file,
        }
      })

      const actualXml = formatter.formatStream(files)
      expect(actualXml).to.have.entriesCount('<checkstyle', 1)
      expect(actualXml).to.have.entriesCount('<file', files.length)
    })
  })
})
