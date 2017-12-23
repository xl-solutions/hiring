require 'rails_helper'

describe Cellphone do
  let(:cellphone) { FactoryGirl.create(:cellphone) }

  describe "attributes" do
    it { expect(cellphone).to respond_to(:maker) }
    it { expect(cellphone).to respond_to(:model) }
    it { expect(cellphone).to respond_to(:color) }
    it { expect(cellphone).to respond_to(:modality) }
    it { expect(cellphone).to respond_to(:quantity) }
    it { expect(cellphone).to respond_to(:value) }
  end

  describe "methods" do
    describe ".import_csv" do
      context "valid csv" do
        let(:file) { File.new("spec/fixtures/valid.csv") }

        before do
          allow(CellphoneImporterJob).to receive(:perform_now)
        end

        it "calls job for importing data" do
          expect(CellphoneImporterJob).to receive(:perform_now)

          Cellphone.import_csv(file)
        end
      end

      context "invalid csv" do
        let(:file) { File.new("spec/fixtures/invalid.csv") }

        it "does not call job for importing data" do
          expect(CellphoneImporterJob).not_to receive(:perform_now)

          Cellphone.import_csv(file)
        end
      end
    end

    describe ".save_from_csv" do
      it "parse and create cellphones from data" do
        expect(Cellphone.count).to eql(0)

        Cellphone.save_from_csv('spec/fixtures/valid.csv')

        expect(Cellphone.count).to eql(12)
      end
    end

    describe "valid_csv?" do
      context "success" do
        let(:file) { File.new("spec/fixtures/valid.csv") }

        it "returns true" do
          expect(Cellphone.valid_csv?(file)).to eql(true)
        end
      end

      context "failure" do
        let(:file) { File.new("spec/fixtures/invalid.csv") }

        it "returns true" do
          expect(Cellphone.valid_csv?(file)).to eql(false)
        end
      end
    end
  end
end
