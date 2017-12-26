require 'rails_helper'

describe ImporterController do
  describe 'POST #upload_file' do
    context 'success' do
      before do
        allow(Cellphone).to receive(:import_csv).and_return(true)
      end

      it "shows success message" do
        post :upload_file, params: { file: 'test.csv' }

        expect(flash[:notice]).to eql("Aparelhos importados com sucesso.")
      end

      it "redirects to cellphones_path" do
        post :upload_file, params: { file: 'test.csv' }

        expect(response).to redirect_to(cellphones_path)
      end
    end

    context 'failure' do
      before do
        allow(Cellphone).to receive(:import_csv).and_return(false)
      end

      it "shows faiure message" do
        post :upload_file, params: { file: 'test.csv' }

        expect(flash[:alert]).to eql("CSV invalido.")
      end

      it "redirects to cellphones_path" do
        post :upload_file, params: { file: 'test.csv' }

        expect(response).to redirect_to(cellphones_path)
      end
    end
  end
end
