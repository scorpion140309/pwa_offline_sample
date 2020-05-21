// UI
// html ファイル の id と合わせる。
const ary2_selected_id =
[
	['id0_0', 'id0_1'],
	['id1_0', 'id1_1'],
	['id2_0', 'id2_1'],
];
const ary2_txt_id =
[
	['id_txt_0_0', 'id_txt_0_1', 'id_txt_0_2', 'id_txt_0_3', 'id_txt_0_4', 'id_txt_0_5'],
	['id_txt_1_0', 'id_txt_1_1', 'id_txt_1_2', 'id_txt_1_3', 'id_txt_1_4', 'id_txt_1_5'],
	['id_txt_2_0', 'id_txt_2_1', 'id_txt_2_2', 'id_txt_2_3', 'id_txt_2_4', 'id_txt_2_5'],
];
const ary_radio_group = ['radio_0','radio_1','radio_2',];

// 初期値
const ary2_def_type =
[
	[POKE_TYPE.e_DRAGON, POKE_TYPE.e_HIKOU],
	[POKE_TYPE.e_KUSA, POKE_TYPE.e_DOKU],
	[POKE_TYPE.e_MIZU, POKE_TYPE.e_JIMEN],
];

function InitListbox1(a_id)
{
	const ary_def_idx = [17, 9]
	for (let i = 0; i < PKMN.TypeNumInPoke(); i++)
	{
		let select =document.getElementById(ary2_selected_id[a_id][i]);
		select.options.length = 0;
		for (let t = 0; t < PKMN.GetTypeNum(); t++)
		{
			let str = PKMN.GetLongName(t);
			select.options[t] = new Option(str);
		}//
		//
		select.options.selectedIndex = ary2_def_type[a_id][i];
	}
}

//
function GetResultAry_(a_id, a_ary_result)
{
	//
	let ary_select = [null, null];
	let ary_defence_type=[0, 0];
	for (let i = 0; i < PKMN.TypeNumInPoke(); i++)
	{
		ary_select[i] =document.getElementById(ary2_selected_id[a_id][i]);
		ary_defence_type[i] = ary_select[i].options.selectedIndex;
	}

	//
	let num_in_1poke = 1;
	let ary_radio_elements = document.getElementsByName(ary_radio_group[a_id]) ;
	if (ary_radio_elements[1].checked == true && ary_defence_type[0] != ary_defence_type[1])
	{
		num_in_1poke=2;
		ary_select[1].style.color = 'black';
	}
	else
	{
		ary_select[1].style.color = 'white';
		ary_radio_elements[0].checked = true
	}
	// 格納先の初期化
	for (let i = 0; i < a_ary_result.length; i++)
	{
		a_ary_result[i] = "";
	}

	// attack
	// デバッグのため1タイプずつ表示更新する。
	for (let a = 0; a < PKMN.GetTypeNum(); a++)
	{
		// 攻撃タイプ
		const str_poke_type = PKMN.GetShortName(a);// ARY_NAME_S[a]

		// 耐性[-2,1]の合計
		let sum_taisei = 0;

		// defence
		for (let d = 0; d < num_in_1poke; d++)
		{
			const defence_id = ary_defence_type[d];
			const taisei = PKMN.DamegeCoef(a, defence_id);
			sum_taisei += taisei;
		}
		switch (sum_taisei)
		{
		case 2:
			a_ary_result[0] += str_poke_type;
			break;
		case 1:
			a_ary_result[1] += str_poke_type;
			break;
		case 0:
			a_ary_result[2] += str_poke_type;
			break;
		case -1:
			a_ary_result[3] += str_poke_type;
			break;
		case -2:
			a_ary_result[4] += str_poke_type;
			break;
		case -3:
			a_ary_result[5] += str_poke_type;
			break;
		}
	}
}

function Calc_and_DispDamageCoef(a_id)
{
	let ary_result =['','','','','','']
	GetResultAry_(a_id, ary_result)
	// 表示
	for (let i = 0; i < ary_result.length; i++)
	{
		let item = document.getElementById(ary2_txt_id[a_id][i]);
		item.value = ary_result[i];
	}
}

function Disp1(a_id)
{
	Calc_and_DispDamageCoef(a_id);
}

//
function Exe1(a_id)
{
	InitListbox1(a_id);
	Disp1(a_id);
}
//
function ExeAll()
{
	for (let id = 0; id < PKMN.PokeNumInTeam(); id++)
	{
		Exe1(id);
	}
}

