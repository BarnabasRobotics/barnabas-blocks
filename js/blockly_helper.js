var COMPILE_URL = "https://compile.barnabasrobotics.com"

function uploadClick(test = false) {
  if (selected == 'blocks') {
    var code = Blockly.Arduino.workspaceToCode();
  } else {
    var code = document.getElementById("content_arduino").value;
  }

  console.log(code);
  var board = $("#board-select").data("board");
  if (board == 'uno') {
    var avr = 'arduino:avr:uno';
  } else {
    var avr = 'arduino:avr:nano:cpu=atmega328';
  }
  // console.info(avr);

  $.post(COMPILE_URL + "/compile", { sketch: code, board: avr }, function (data) {
    // console.log(data);
    console.warn(data.stdout, data.stderr, '\n\n');
    if (!data.success) {
      console.warn(0, data.msg, true);
      let regex = /\/tmp\/chromeduino\-(.*?)\/chromeduino\-(.*?)\.ino\:/g;
      let message = data.stderr.replace(regex, "");
      upload_result(message, false)

      // // this code selects range of text
      // const input = document.getElementById('content_arduino');  
      // input.focus();
      // input.setSelectionRange(2, 5);
      return;
    }
    document.getElementById('content_hex').innerHTML = (data.hex);
    let hexstr = atob(document.getElementById('content_hex').innerHTML);
    document.getElementById('content_hex').innerHTML = hexstr;

    try {
      let avrgirl = new AvrgirlArduino({
        board: board,
        debug: true
      });
  
      avrgirl.flash(str2ab(hexstr), (error) => {
        // gear.classList.remove('spinning');
        // progress.textContent = "done!";
        if (error) {
          console.error(error);
          upload_result(error, false);
        } else {
          console.info('done correctly.');
          upload_result(data.stdout)
        }
      });
    } catch (error) {
      console.error(error);
      upload_result(error, false);
    }

  });
}

function upload_result(msg, success = true){
  let icon = '';
  let output = '';
  if (success) {
    icon = '<i class="material-icons" style="font-size:48px;color:green">check_circle</i>';
  } else {
    icon = '<i class="material-icons" style="font-size:48px;color:red">error</i>';
  }
  output = `<pre>${msg}</pre>`;
  document.getElementById("arduino-msg").innerHTML = icon + output;
  $('#arduino_return').openModal();
}

var hexf =
  `:100000000C945E000C9486000C9486000C94860080
:100010000C9486000C9486000C9486000C94860048
:100020000C9486000C9486000C9486000C94860038
:100030000C9486000C9486000C9486000C94860028
:100040000C94DE020C9486000C94AC020C94860294
:100050000C9486000C9486000C9486000C94860008
:100060000C9486000C9486000000000024002700F9
:100070002A0000000000250028002B0004040404CE
:100080000404040402020202020203030303030342
:10009000010204081020408001020408102001021F
:1000A00004081020000000080002010000030407FB
:1000B00000000000000000002803500511241FBEAE
:1000C000CFEFD8E0DEBFCDBF22E0ACE5B1E001C0AC
:1000D0001D92AC30B207E1F711E0A0E0B1E0ECE333
:1000E000FFE002C005900D92AC35B107D9F710E0E2
:1000F000CDE5D0E004C02197FE010E949005CC35EB
:10010000D107C9F70E949E030C9491070C9400003C
:10011000E1EBF0E02491EDE9F0E09491E9E8F0E022
:10012000E491EE23C9F0222339F0233001F1A8F441
:10013000213019F1223029F1F0E0EE0FFF1FEE58C7
:10014000FF4FA591B4912FB7F894EC91811126C07F
:1001500090959E239C932FBF08952730A9F02830B7
:10016000C9F0243049F7209180002F7D03C02091F1
:1001700080002F7720938000DFCF24B52F7724BD18
:10018000DBCF24B52F7DFBCF2091B0002F772093BC
:10019000B000D2CF2091B0002F7DF9CF9E2BDACFC7
:1001A0000895AF92BF92CF92DF92EF92FF920F939A
:1001B0001F93CF93DF936C017B018B01040F151FFD
:1001C000EB015E01AE18BF08C017D10759F0699165
:1001D000D601ED91FC910190F081E02DC6010995C9
:1001E000892B79F7C501DF91CF911F910F91FF9076
:1001F000EF90DF90CF90BF90AF900895FC01538DAA
:10020000448D252F30E0842F90E0821B930B5417F0
:1002100010F0CF96089501970895FC01918D828D7D
:10022000981761F0A28DAE0FBF2FB11D5D968C9116
:10023000928D9F5F9F73928F90E008958FEF9FEF55
:1002400008952FB7F8948091610190916201A09177
:100250006301B09164012FBF80936D0190936E0193
:10026000A0936F01B093700185E691E00E940D01AB
:1002700097FF26C02FB7F894809161019091620199
:10028000A0916301B09164012FBF40916D01509125
:100290006E0160916F0170917001841B950BA60B2C
:1002A000B70B4091690150916A0160916B017091A7
:1002B0006C0184179507A607B707B0F28FEF9FEF81
:1002C0000895FC01918D828D981731F0828DE80F91
:1002D000F11D858D90E008958FEF9FEF0895FC014B
:1002E000918D228D892F90E0805C9F4F821B910918
:1002F0008F739927089585E691E00E946F0121E0B0
:10030000892B09F420E0822F089580E090E0892B6A
:1003100029F00E947B0181110C9400000895FC01DA
:10032000A48DA80FB92FB11DA35ABF4F2C91848D56
:1003300090E001968F739927848FA689B7892C93B3
:10034000A089B1898C91837080648C93938D848D06
:10035000981306C00288F389E02D80818F7D808309
:100360000895EF92FF920F931F93CF93DF93EC01C9
:1003700081E0888F9B8D8C8D98131AC0E889F9894C
:10038000808185FF15C09FB7F894EE89FF8960834F
:10039000E889F98980818370806480839FBF81E0D0
:1003A00090E0DF91CF911F910F91FF90EF90089512
:1003B000F62E0B8D10E00F5F1F4F0F731127E02EED
:1003C0008C8D8E110CC00FB607FCFACFE889F98925
:1003D000808185FFF5CFCE010E948F01F1CFEB8D9B
:1003E000EC0FFD2FF11DE35AFF4FF0829FB7F894F9
:1003F0000B8FEA89FB8980818062CFCFCF93DF9317
:10040000EC01888D8823B9F0AA89BB89E889F9892C
:100410008C9185FD03C0808186FD0DC00FB607FC61
:10042000F7CF8C9185FFF2CF808185FFEDCFCE0194
:100430000E948F01E9CFDF91CF9108953FB7F894E3
:1004400080915D0190915E01A0915F01B09160018A
:1004500026B5A89B05C02F3F19F00196A11DB11D1F
:100460003FBFBA2FA92F982F8827BC01CD01620F5B
:10047000711D811D911D42E0660F771F881F991F16
:100480004A95D1F70895FC0101900020E9F73197D2
:10049000AF01481B590BBC0185E691E00C94D100DB
:1004A000CF93DF930E944302EC0188E191E00E9428
:1004B00043028C0F9D1FDF91CF9108950F931F93DF
:1004C000CF93DF93EC0188819981009759F02A81BD
:1004D0003B812617370730F081E0DF91CF911F91E4
:1004E0000F9108958B016F5F7F4F0E94BB060097AD
:1004F00059F0998388831B830A832C813D81232BA8
:1005000059F7FC011082E8CF80E0E7CF1F920F92ED
:100510000FB60F9211242F933F934F935F936F93D6
:100520007F938F939F93AF93BF93EF93FF9385E652
:1005300091E00E948F01FF91EF91BF91AF919F9148
:100540008F917F916F915F914F913F912F910F907C
:100550000FBE0F901F9018951F920F920FB60F921B
:1005600011242F938F939F93EF93FF93E091750145
:10057000F09176018081E0917B01F0917C0182FD18
:100580001BC0908180917E018F5F8F7320917F01CE
:10059000821741F0E0917E01F0E0EB59FE4F958F1C
:1005A00080937E01FF91EF919F918F912F910F90FA
:1005B0000FBE0F901F9018958081F4CF1F920F925D
:1005C0000FB60F9211242F933F938F939F93AF9366
:1005D000BF938091610190916201A0916301B091FC
:1005E000640130915C0123E0230F2D3758F501960B
:1005F000A11DB11D20935C01809361019093620164
:10060000A0936301B093640180915D0190915E01BC
:10061000A0915F01B09160010196A11DB11D809371
:100620005D0190935E01A0935F01B0936001BF9163
:10063000AF919F918F913F912F910F900FBE0F908F
:100640001F90189526E8230F0296A11DB11DD2CF49
:10065000109268011092670188EE93E0A0E0B0E08C
:100660008093690190936A01A0936B01B0936C0130
:100670008AE091E0909366018093650185EC90E0BB
:10068000909372018093710184EC90E090937401D7
:100690008093730180EC90E09093760180937501D4
:1006A00081EC90E0909378018093770182EC90E068
:1006B00090937A018093790186EC90E090937C018D
:1006C00080937B0110927E0110927F011092800135
:1006D0001092810110920302109202021092050200
:1006E00010920402109207021092060270E060E07D
:1006F00082E092E00E945E022091020230910302A9
:10070000811113C02115310519F0C9010E9432066B
:100710001092030210920202109207021092060237
:10072000109205021092040208951092070210928E
:1007300006026AE171E0C9010C948A07CF93DF9346
:10074000CDB7DEB728970FB6F894DEBF0FBECDBF8A
:10075000789484B5826084BD84B5816084BD85B59C
:10076000826085BD85B5816085BD80916E008160A8
:1007700080936E001092810080918100826080934E
:100780008100809181008160809381008091800050
:100790008160809380008091B10084608093B1007B
:1007A0008091B00081608093B00080917A00846075
:1007B00080937A0080917A00826080937A008091A1
:1007C0007A00816080937A0080917A0080688093BB
:1007D0007A001092C100EDE9F0E02491E9E8F0E040
:1007E0008491882399F090E0880F991FFC01E859C3
:1007F000FF4FA591B491FC01EE58FF4F8591949164
:100800008FB7F894EC91E22BEC938FBFE0917501D8
:10081000F091760182E08083E0917101F0917201A4
:100820001082E0917301F09174018FEC808310923B
:100830007D01E0917901F0917A0186E08083E09179
:100840007701F0917801808180618083E091770168
:10085000F0917801808188608083E0917701F09148
:100860007801808180688083E0917701F091780140
:1008700080818F7D80838BE191E00E94500290E027
:10088000E92E90E0F92E85E691E00E946F0118169E
:1008900019060CF0E0C01A8219821C821B821E828B
:1008A0001D8270E060E0CE0101960E945E02298107
:1008B0003A8181112BC02115310519F0C9010E941F
:1008C00032061A8219821E821D821C821B820E949D
:1008D000210197FD23C08F8318860D811E810F5F34
:1008E0001F4FB801CE0101960E945E02882379F362
:1008F00029813A818D819E81BE01695F7F4F820F80
:10090000931F0E948A071E830D83E1CF1E821D82E2
:100910006AE171E0C9010E948A07D9CF8091020281
:1009200090910302009709F4A4C069817A8161154E
:10093000710509F49CC040910402509105022D817B
:100940003E814217530708F492C00E948A078D81A6
:100950009E8190930702809306021E821D828981E8
:100960009A81009711F00E9432060E941E022B010C
:100970003C0185E0882E912CA12CB12C0E941E02F6
:100980006419750986099709683E734081059105C8
:10099000A8F321E0821A9108A108B10888EE480E58
:1009A00083E0581E611C711C81149104A104B104E0
:1009B00029F78091060290910702892BC9F00091D6
:1009C0000202109103026BE271E0C8010E948107EC
:1009D000892B39F06FE271E0C8010E948107892BF1
:1009E00039F481E00E94880081E391E00E94500286
:1009F0008091060290910702892BC9F000910202B2
:100A0000109103026BE371E0C8010E948107892BFA
:100A100039F060E471E0C8010E948107892B39F444
:100A200080E00E94880082E491E00E9450028DE400
:100A300091E00E94430240910602509107026091AA
:100A400002027091030285E691E00E94D10088E1E4
:100A500091E00E944302E114F10409F414CF0E94D2
:100A60007B01882309F40FCF0E9400000CCF0E9465
:100A7000320689819A8190930302809302028B81CE
:100A80009C8190930502809304028D819E819093B6
:100A90000702809306021A8219821C821B825DCF94
:100AA0008091020290910302009711F00C9432069B
:100AB00008952F923F924F925F926F927F928F9202
:100AC0009F92AF92BF92CF92DF92EF92FF920F93DD
:100AD0001F93CF93DF93CDB7DEB7CA1BDB0B0FB6E7
:100AE000F894DEBF0FBECDBF09942A8839884888A4
:100AF0005F846E847D848C849B84AA84B984C8843A
:100B0000DF80EE80FD800C811B81AA81B981CE0F30
:100B1000D11D0FB6F894DEBF0FBECDBFED01089515
:100B2000EE0FFF1F0590F491E02D09940F931F9392
:100B3000CF93DF938230910510F482E090E0E09152
:100B40000A02F0910B0230E020E0B0E0A0E0309724
:100B500099F42115310509F44AC0281B390B2430BA
:100B60003105D8F58A819B816115710589F1FB01F9
:100B700093838283FE0111C04081518102811381E0
:100B800048175907E0F04817590799F4109761F092
:100B900012960C93129713961C933296CF01DF9105
:100BA000CF911F910F91089500930A0210930B02A9
:100BB000F4CF2115310551F04217530738F0A90140
:100BC000DB019A01BD01DF01F801C1CFEF01F9CFCF
:100BD00090930B0280930A02CDCFFE01E20FF31F28
:100BE000819391932250310939832883D7CF209163
:100BF000080230910902232B41F420910201309127
:100C000003013093090220930802209100013091E2
:100C100001012115310541F42DB73EB74091040182
:100C200050910501241B350BE0910802F091090257
:100C3000E217F307A0F42E1B3F0B2817390778F0B3
:100C4000AC014E5F5F4F2417350748F04E0F5F1F12
:100C50005093090240930802819391939FCFF0E053
:100C6000E0E09CCFCF93DF930097E9F0FC0132974F
:100C700013821282A0910A02B0910B02ED0130E0C2
:100C800020E01097A1F420813181820F931F2091E1
:100C90000802309109022817390709F061C0F09362
:100CA0000902E0930802DF91CF910895EA01CE177F
:100CB000DF07E8F54A815B819E0141155105B1F7D7
:100CC000E901FB83EA8349915991C40FD51FEC17C1
:100CD000FD0761F4808191810296840F951FE901DF
:100CE00099838883828193819B838A83F0E0E0E00B
:100CF00012968D919C9113970097B9F52D913C9187
:100D00001197CD010296820F931F20910802309116
:100D100009022817390739F6309751F510920B025E
:100D200010920A02B0930902A0930802BCCFD383A9
:100D3000C28340815181840F951FC817D90761F480
:100D40004E5F5F4F88819981480F591F51834083BF
:100D50008A819B81938382832115310509F0B0CF6D
:100D6000F0930B02E0930A029ECFFD01DC01C0CF9D
:100D700013821282D7CFB0E0A0E0E1ECF6E00C9451
:100D80005B058C01009751F4CB010E9496058C0104
:100D9000C801CDB7DEB7E0E10C947705FC01E60FA2
:100DA000F71F9C0122503109E217F30708F49DC098
:100DB000D901CD91DC911197C617D70798F0C530AE
:100DC000D10530F3CE0104978617970708F3C61BA9
:100DD000D70B2297C193D1936D937C93CF010E943F
:100DE0003206D6CF5B01AC1ABD0A4C018C0E9D1E9B
:100DF000A0910A02B0910B02512C412CF12CE12C54
:100E0000109731F580910802909109028815990593
:100E100009F05CC04616570608F058C080910001E2
:100E200090910101009741F48DB79EB74091040164
:100E300050910501841B950BE817F90708F055C080
:100E4000F0930902E0930802F90171836083A0CF57
:100E50008D919C91119712966C90129713967C909D
:100E60001397A815B90559F56C0142E0C40ED11CC1
:100E7000CA14DB0420F1AC014A195B09DA011296AD
:100E8000159780F06282738251834083D9016D93FC
:100E90007C93E114F10471F0D7011396FC93EE9367
:100EA000129776CF22968C0F9D1FF9019183808334
:100EB000F301EFCFF0930B02E0930A0269CF4816DB
:100EC000590608F42C017D01D3019ACFCB010E9471
:100ED00096057C01009749F0AE01B8010E947807A1
:100EE000C8010E943206870153CF10E000E050CFC6
:100EF000FB01DC0102C001900D9241505040D8F737
:100F00000895FB01DC018D91019080190110D9F346
:100F1000990B0895FB01DC0101900D920020E1F78F
:100F2000089510E0CDE5D0E004C0FE010E949005D8
:0C0F30002196CE35D107C9F7F894FFCF09
:100F3C0000000C02800000000000B101D100FE0096
:100F4C00FE016F010D0161010D0A005365726961AB
:100F5C006C206973205245414459004C4F4E00316E
:100F6C00004C4544206973204F4E004C4F464600C0
:100F7C0030004C4544206973204F4646005365723F
:0C0F8C0069616C20524541443A2000008D
:00000001FF`;